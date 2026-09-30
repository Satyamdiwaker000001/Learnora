import { z } from "zod";

// --- Sign In ---
export const signInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter")
});

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

// --- Create / Update Course ---
export const createCourseSchema = z.object({
  name: z.string().min(1, "Course name wajib diisi"),
  tagline: z.string().min(1, "Tagline wajib diisi"),
  categoryId: z.string().min(1, "Pilih kategori"),
  description: z.string().min(1, "Deskripsi wajib diisi")
});

export const updateCourseSchema = createCourseSchema.extend({
  thumbnail: z.any().optional()
});

// --- Create / Update Student ---
export const createStudentSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  avatar: z.any().optional()
});

export const updateStudentSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  avatar: z.any().optional()
});

// --- Add Student to Course ---
export const addStudentCourseSchema = z.object({
  studentId: z.string().min(1, "Pilih salah satu student")
});

// --- Course Content (Video / Text) ---
export const mutateContentSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  type: z.enum(["video", "text"], {
    required_error: "Tipe konten wajib dipilih"
  }),
  youtubeId: z.string().optional(),
  text: z.string().optional()
});
