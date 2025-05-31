import { supabase, type Application } from './supabase'

export interface FormData {
  preferredRole: string
  name: string
  email: string
  githubProfile: string
  linkedinTwitterProfile?: string
  resumeFile: File
  currentSchool?: string
  pitch: string
}

// Upload resume
export async function uploadResume(file: File, applicantName: string): Promise<string> {
  try {
    // create a unique filename with timestamp and applicant name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const sanitizedName = applicantName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const fileName = `${timestamp}-${sanitizedName}-resume.pdf`
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('File upload error:', error)
      throw new Error(`Failed to upload resume: ${error.message}`)
    }

    return data.path
  } catch (error) {
    console.error('Upload resume error:', error)
    throw error
  }
}

// Submit application to database
export async function submitApplication(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Starting application submission...');
    console.log('Form data:', {
      name: formData.name,
      email: formData.email,
      role: formData.preferredRole
    });

    // First upload the resume
    console.log('Uploading resume...');
    const resumeFilePath = await uploadResume(formData.resumeFile, formData.name)
    console.log('Resume uploaded successfully:', resumeFilePath);

    // Prepare application data for database
    const applicationData: Omit<Application, 'id' | 'created_at'> = {
      preferred_role: formData.preferredRole,
      name: formData.name,
      email: formData.email,
      github_profile: formData.githubProfile,
      linkedin_twitter_profile: formData.linkedinTwitterProfile || undefined,
      resume_file_path: resumeFilePath,
      current_school: formData.currentSchool || undefined,
      pitch: formData.pitch
    }

    console.log('Prepared application data:', applicationData);

    // Insert into database
    console.log('Inserting into database...');
    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select()

    if (error) {
      console.error('Database insert error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to save application: ${error.message}`)
    }

    console.log('Application submitted successfully:', data)
    return { success: true }

  } catch (error) {
    console.error('Submit application error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

// Get public URL for resume file
export async function getResumeUrl(filePath: string): Promise<string> {
  const { data } = supabase.storage
    .from('resumes')
    .getPublicUrl(filePath)
  
  return data.publicUrl
} 