"use client";

import React from "react";
import { ArrowUpRight, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "~/components/shared/SearchBar";

// Content component for blog posts
const BlogContent = ({ postId }: { postId: string }) => {
  if (postId === "1") {
    return (
      <>
        <p>
          We are thrilled to introduce <strong>Keizer k26</strong>, our latest program designed to help startups <em className="italic">Build & Scale</em> faster than ever before. This initiative represents our commitment to empowering the next generation of entrepreneurs with the tools, resources, and expertise they need to transform ideas into market-leading products.
        </p>
        
        <p>
          At Keizer, we've spent years working with startups across various industries, and we've identified the critical moments where the right support can make all the difference. The k26 program is our answer to the challenges that founders face when trying to build products that scale.
        </p>

        <div className="pt-8 pb-4">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest border-b border-black pb-1 inline-block">
            Building for Scale
          </h2>
        </div>

        <p>
          The first pillar of k26 is <strong>Build</strong>. We partner with startups to develop market-ready products from day one. Our team of engineers, designers, and product strategists work alongside founders to create solutions that are not just functional, but scalable from the ground up. We believe that <em className="italic">"building right"</em> is more important than building fast—though we do both.
        </p>

        <p>
          Our approach combines technical excellence with product-market fit validation. We help startups architect systems that can handle growth, design user experiences that drive engagement, and implement best practices that prevent technical debt from slowing down future expansion.
        </p>
        
        <p>
          The second pillar is <strong>Scale</strong>. Once a product is built, the real challenge begins. Scaling requires more than just infrastructure—it demands strategic thinking about growth, operations, team building, and market expansion. Through k26, we provide startups with frameworks, tools, and hands-on support to navigate the complexities of scaling.
        </p>

        <div className="pt-8 pb-4">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest border-b border-black pb-1 inline-block">
            What Makes k26 Different
          </h2>
        </div>

        <p>
          Unlike traditional accelerators or incubators, k26 is built on the principle of <em className="italic">partnership, not just investment</em>. We don't just write checks—we roll up our sleeves and work alongside founders. Our team has been in your shoes, and we understand the unique challenges of building and scaling a startup.
        </p>

        <p>
          Selected startups in the k26 cohort receive comprehensive support including product development resources, go-to-market strategy, technical mentorship, and access to our network of investors, advisors, and potential customers. We're not just advisors—we're co-builders.
        </p>

        <p>
          If you're a founder ready to build something that scales, we'd love to hear from you. <a href="#" className="text-[#2563EB] hover:underline decoration-1 underline-offset-4">Learn more</a> about the k26 program and how we can help you build and scale your startup.
        </p>
      </>
    );
  }

  if (postId === "2") {
    return (
      <>
        <p>
          We're excited to introduce <strong>Keizer k25</strong> and invite you to <em className="italic">JOIN THE CULTURE</em>. This isn't just another accelerator program—it's a movement. A community of builders, innovators, and dreamers who believe that with the right culture and support, any startup can achieve extraordinary things.
        </p>
        
        <p>
          Culture isn't something you create overnight. It's built through shared values, mutual support, and a collective commitment to excellence. At Keizer, we've spent years cultivating a culture that celebrates innovation, embraces failure as a learning opportunity, and champions the success of every member in our community.
        </p>

        <div className="pt-8 pb-4">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest border-b border-black pb-1 inline-block">
            What is the Keizer Culture?
          </h2>
        </div>

        <p>
          The Keizer culture is built on three fundamental principles: <strong>collaboration over competition</strong>, <strong>growth through community</strong>, and <strong>impact through innovation</strong>. We believe that when founders come together, share knowledge, and support each other, everyone wins.
        </p>

        <p>
          In the k25 program, you're not just joining a cohort—you're becoming part of a family. A family that celebrates your wins, supports you through challenges, and pushes you to be your best. We've seen time and again how the power of community can transform individual startups into industry leaders.
        </p>

        <div className="pt-8 pb-4">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest border-b border-black pb-1 inline-block">
            More Than a Program
          </h2>
        </div>

        <p>
          k25 goes beyond traditional startup support. We provide mentorship from seasoned entrepreneurs, access to our network of investors and partners, resources for product development and growth, and most importantly—a community that will be with you long after the program ends.
        </p>

        <p>
          Our alumni network spans industries and continents, and they continue to support each other, share opportunities, and collaborate on new ventures. When you join k25, you're not just getting support for your current startup—you're building relationships that will last throughout your entrepreneurial journey.
        </p>
        
        <p>
          The k25 culture is about more than building companies—it's about building a movement. A movement of founders who believe in the power of community, the importance of culture, and the potential of innovation to change the world.
        </p>

        <p>
          Ready to join the culture? <a href="#" className="text-[#2563EB] hover:underline decoration-1 underline-offset-4">Applications are now open</a> for the next k25 cohort. We're looking for founders who share our values, embrace our culture, and are ready to build something extraordinary together.
        </p>
      </>
    );
  }

  return null;
};

// Mock blog data - in a real app, this would come from a CMS or database
const blogPosts: Record<string, {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  author: string;
}> = {
  "1": {
    id: 1,
    title: "Introducing Keizer k26 : Build & Scale",
    description: "Keizer partners with startups to develop market-ready products, providing the expertise and support needed for growth.",
    category: "Venture Capital",
    image: "/assets/decoration/blog-1.svg",
    date: "December 2, 2025",
    author: "Keizer Team",
  },
  "2": {
    id: 2,
    title: "Introducing Keizer k25 : JOIN THE CULTURE",
    description: "Keizer partners with startups to develop market-ready products, providing the expertise and support needed for growth.",
    category: "Venture Capital",
    image: "/assets/decoration/blog-2.svg",
    date: "November 15, 2025",
    author: "Keizer Team",
  }
};

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-white font-sans text-[#111111] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#2563EB] hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      
      {/* --- NAVBAR (Same as blog listing) --- */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/blog" className="flex items-center gap-2 cursor-pointer">
            <Image src="/assets/logos/klogo1.svg" alt="Keizer Logo" width={44} height={44} className="w-[44px] h-[44px]" />
            <span className="font-semibold text-[16px]">Blog</span>
          </Link>

          
          <SearchBar placeholder="Search blogs" />

          
          <button className="" aria-label="Globe">
            <Image src="/assets/decoration/globe.svg" alt="Globe" width={44} height={44} className="w-[44px] h-[44px]" />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <article className="max-w-[720px] mx-auto w-full">
          
          {/* Article Header */}
          <header className="mb-12">
            <div className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-[#6B7280]">
              {post.date}
            </div>
            <h1 className="text-4xl md:text-6xl leading-[1.1] mb-6 font-semibold text-[#111111]">
              {post.title}
            </h1>
            <div className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#6B7280]">
              By: {post.author}
            </div>
          </header>

          {/* Hero Image */}
          <figure className="mb-16 w-full">
            <Image 
              src={post.image}
              alt={post.title}
              width={720}
              height={450}
              className="w-full h-auto aspect-[16/10] object-cover"
            />
          </figure>

          {/* Article Body */}
          <div className="text-lg md:text-[19px] leading-[1.75] space-y-8 text-[#111111]">
            <BlogContent postId={id} />
          </div>

          {/* --- FOOTER SECTION --- */}
          <div className="mt-24">
            
            {/* Dashed Divider */}
            <div className="w-full border-t border-dashed border-[#CFCFC9] mb-12"></div>

            {/* Share Controls */}
            <div className="flex flex-col items-center md:items-start gap-4 mb-16">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#6B7280]">Share this:</span>
              <div className="flex gap-3">
                <button className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-200">
                  <Twitter size={16} fill="white" />
                </button>
                <button className="h-10 w-10 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform duration-200">
                  <Linkedin size={16} fill="white" />
                </button>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-center md:justify-start">
              <Link href="/blog">
                <button className="group bg-black text-white px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#333333] transition-colors">
                  Return to Blog
                  <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>

          </div>

        </article>
      </main>
    </div>
  );
}

