import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBriefcase,
  FiPhone,
  FiPlus,
} from "react-icons/fi";
import { useFormik } from "formik";
import { validationSchema } from "../lib/utils/validation";

const initialSkillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "Django",
  "Next.js",
];

const Signup = () => {
  const [skillsList, setSkillsList] = useState(initialSkillsList);
  const [newSkill, setNewSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      skills: [],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const checkUser = await axios.get(
          `http://localhost:3000/team?email=${values.email}`
        );
        if (checkUser.data.length > 0) {
          setErrors({ email: "Email is already registered" });
          setSubmitting(false);
          return;
        }

        const userId = Date.now();
        const newTeamMember = {
          id: userId,
          name: values.name,
          role: values.role,
          email: values.email,
          phone: values.phone,
          skills: values.skills,
        };

        await axios.post("http://localhost:3000/team", newTeamMember);

        setSuccessMessage(
          "Account created successfully! You are being redirected to the login page..."
        );
        setTimeout(() => {
          navigate("/Signin");
        }, 2000);
      } catch (err) {
        console.error(err);
        setSubmitting(false);
      }
    },
  });

  const handleSkillChange = (skill) => {
    if (formik.values.skills.includes(skill)) {
      formik.setFieldValue(
        "skills",
        formik.values.skills.filter((s) => s !== skill)
      );
    } else {
      formik.setFieldValue("skills", [...formik.values.skills, skill]);
    }
  };

  const handleAddNewSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skillsList.includes(trimmedSkill)) {
      setSkillsList([...skillsList, trimmedSkill]);
      formik.setFieldValue("skills", [...formik.values.skills, trimmedSkill]);
      setNewSkill("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-center"
          >
            Create New Acount
          </motion.h2>
        </div>

        <div className="p-8">
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              {successMessage}
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="phone"
                placeholder="رقم التليفون"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-xs">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            {/* Role */}
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="role"
                placeholder="الوظيفة"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-500 text-xs">{formik.errors.role}</div>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                المهارات:
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {skillsList.map((skill) => (
                  <motion.label
                    key={skill}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formik.values.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="accent-indigo-500"
                    />
                    <span className="text-gray-700">{skill}</span>
                  </motion.label>
                ))}
              </div>

              {formik.touched.skills && formik.errors.skills && (
                <div className="text-red-500 text-xs">
                  {formik.errors.skills}
                </div>
              )}

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="أضف مهارة جديدة"
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddNewSkill}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              {formik.isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
            <Link to="/Signin">
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300 mt-2">
                Signin
              </button>
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
