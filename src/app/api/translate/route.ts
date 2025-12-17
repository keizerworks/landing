import { NextRequest, NextResponse } from "next/server";
import { LingoDotDevEngine } from "lingo.dev/sdk";
import type { SupportedLocale } from "~/lib/lingo";

const getLingoEngine = (): LingoDotDevEngine | null => {
  const apiKey = process.env.NEXT_PUBLIC_LINGODOTDEV_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  return new LingoDotDevEngine({
    apiKey,
    batchSize: 100,
    idealBatchItemSize: 1000,
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, object, html, sourceLocale, targetLocale, type } = body;

    if (!targetLocale || !sourceLocale) {
      return NextResponse.json(
        { error: "sourceLocale and targetLocale are required" },
        { status: 400 }
      );
    }

    // If target locale is English, return original content
    if (targetLocale === "en") {
      return NextResponse.json({
        translated: text || object || html,
      });
    }

    // Check if API key is set
    const engine = getLingoEngine();
    if (!engine) {
      console.warn("LINGODOTDEV_API_KEY is not set. Returning original content.");
      return NextResponse.json({
        translated: text || object || html,
      });
    }

    let translated;

    if (type === "object" && object !== undefined) {
      // Handle arrays - convert to object, translate, then convert back
      if (Array.isArray(object)) {
        // For arrays of strings, translate each string
        if (object.length > 0 && typeof object[0] === "string") {
          const translatedArray = await Promise.all(
            object.map((item: string) =>
              engine.localizeText(item, {
                sourceLocale: sourceLocale as SupportedLocale,
                targetLocale: targetLocale as SupportedLocale,
              })
            )
          );
          translated = translatedArray;
        } else {
          // For arrays of objects, translate the entire array as an object
          const arrayAsObject = { items: object };
          const translatedObj = await engine.localizeObject(arrayAsObject, {
            sourceLocale: sourceLocale as SupportedLocale,
            targetLocale: targetLocale as SupportedLocale,
          });
          translated = translatedObj.items || object;
        }
      } else {
        // Regular object translation
        translated = await engine.localizeObject(object, {
          sourceLocale: sourceLocale as SupportedLocale,
          targetLocale: targetLocale as SupportedLocale,
        });
      }
    } else if (type === "html" && html) {
      translated = await engine.localizeHtml(html, {
        sourceLocale: sourceLocale as SupportedLocale,
        targetLocale: targetLocale as SupportedLocale,
      });
    } else if (text) {
      translated = await engine.localizeText(text, {
        sourceLocale: sourceLocale as SupportedLocale,
        targetLocale: targetLocale as SupportedLocale,
      });
    } else {
      return NextResponse.json(
        { error: "text, object, or html is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ translated });
  } catch (error) {
    console.error("Translation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Translation failed";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", { errorMessage, errorStack });
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}

