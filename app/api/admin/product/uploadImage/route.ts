import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@lib/supabaseClient';
import prisma from "@lib/prisma";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();

    // Extract files
    const files = formData.getAll('files') as File[];
    
    // Validate files array is not empty
    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Process the first file
    const fileToStorage = files[0];

    // Ensure file has a name
    if (!fileToStorage.name) {
      return NextResponse.json({ error: 'File is missing a name' }, { status: 400 });
    }

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`public/${uuidv4()}-${fileToStorage.name}`, fileToStorage);

    // Handle upload errors
    if (error) {
      console.error('Error uploading image:', error.message);
      return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }

    // Generate the public URL for the uploaded file
    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
    
    // Create TempImage record in Prisma including the Supabase ID
    const tempImage = await prisma.tempImage.create({
      data: {
        url: fileUrl,
        imageFor: 'product', // Replace with dynamic value if needed
        supabaseId: data.id??"", // Supabase returns a Key, use that for the supabaseId
      },
    });

    // Return response with created TempImage data
    return NextResponse.json({
    //  message: 'File uploaded and temp image created successfully',
      tempImage,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}

