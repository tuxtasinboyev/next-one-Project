'use client';
import Contact from "@/components/Contact/Page";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-24 px-6 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg"
        >
          Salom 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 max-w-2xl"
        >
          Bu bizning ajoyib sahifamiz — pastda biz bilan bog‘lanish uchun barcha
          ma’lumotlar mavjud.
        </motion.p>

        {/* Register & Login Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex gap-4 mt-6"
        >
          <button
            onClick={() => router.push("/register")}
            className="px-6 py-3 bg-white text-green-500 font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Login
          </button>
        </motion.div>
      </header>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <Contact
          title="Biz bilan bog‘laning"
          description="Savollar bo‘lsa, email yoki telefon orqali aloqaga chiqing."
          buttonText="Xabar yuborish"
          email="example@gmail.com"
          phone="+998 90 123 45 67"
        />
      </motion.div>
    </div>
  );
}
