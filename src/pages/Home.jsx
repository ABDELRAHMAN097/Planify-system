import { FaCheck, FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const features = [
    {
      title: "لوحة تحكم ذكية",
      description: "إدارة المهام بسهولة مع واجهة مستخدم بديهية",
    },
    {
      title: "تعاون فريق",
      description: "مشاركة المهام والتعليقات في الوقت الحقيقي",
    },
    {
      title: "تقارير متقدمة",
      description: "تحليلات وأدوات تقارير قابلة للتخصيص",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            البديل الأقوى لـ Trello
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            إدارة المهام باحترافية مع أدوات تعاون متقدمة
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="Signup">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
                التجربة المجانية
              </button>
            </Link>
            <button className="border-2 border-white px-8 py-3 rounded-lg text-lg hover:bg-white hover:text-purple-600">
              مشاهدة العرض التوضيحي
            </button>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-center mb-12">لماذا تختارنا؟</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={fadeUp}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="bg-purple-100 w-fit p-4 rounded-full mb-4">
                <FaStar className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        className="bg-gray-100 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            المقارنة مع Trello
          </h2>
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full text-right">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 border font-semibold text-center">
                    الميزة
                  </th>
                  <th className="px-6 py-4 border font-semibold text-center">
                    Planify
                  </th>
                  <th className="px-6 py-4 border font-semibold text-center">
                    Trello
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t text-center">
                  <td className="px-6 py-4">التكامل مع الأدوات</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center text-green-600">
                      <FaCheck />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center text-gray-600">
                      <FaCheck />
                    </div>
                  </td>
                </tr>
                <tr className="border-t text-center">
                  <td className="px-6 py-4">التقارير المتقدمة</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center text-green-600">
                      <FaCheck />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">-</td>
                </tr>
                <tr className="border-t text-center">
                  <td className="px-6 py-4">الدعم الفني 24/7</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center text-green-600">
                      <FaCheck />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="bg-purple-600 text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">جاهز للبدء؟</h2>
          <p className="text-xl mb-8">انضم إلى آلاف الفرق التي تعتمد علينا</p>
          <Link to="Signup">
            <button className="bg-white text-purple-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100">
              إنشاء حساب مجاني
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
