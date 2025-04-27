import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('الاسم مطلوب')
    .min(3, 'الاسم لازم يكون 3 حروف على الأقل')
    .max(50, 'الاسم طويل جدًا')
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'الاسم يجب أن يحتوي على حروف فقط'),

  email: Yup.string()
    .email('صيغة البريد غير صحيحة')
    .required('البريد الإلكتروني مطلوب'),

  password: Yup.string()
    .required('كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور لازم تكون 6 أحرف على الأقل')
    .max(20, 'كلمة المرور طويلة جدًا')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
      'كلمة المرور لازم تحتوي على حرف كبير وحرف صغير ورقم'
    ),

  phone: Yup.string()
    .required('رقم الهاتف مطلوب')
    .matches(
      /^01[0125][0-9]{8}$/,
      'رقم الهاتف غير صحيح، لازم يبدأ بـ 010 أو 011 أو 012 أو 015'
    ),

  role: Yup.string()
    .required('الوظيفة مطلوبة')
    .min(2, 'الوظيفة قصيرة جدًا'),

  skills: Yup.array()
    .min(1, 'اختار مهارة واحدة على الأقل')
    .of(Yup.string().min(2, 'المهارة قصيرة جدًا'))
});
