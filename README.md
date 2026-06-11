# 🚀 اسم المشروع (مثلاً: Center Masr Platform)

### 📝 Project Overview (نبذة عن المشروع)
وصف مختصر ومبهر للمشروع في سطرين أو ثلاثة. (مثال: منصة تعليمية واجتماعية متكاملة لإدارة المراكز التعليمية وتسهيل التواصل الفوري والحي بين المدرسين والطلاب وأولياء الأمور).

---

### ✨ Key Features (أبرز المميزات)
* **👥 Multi-Role System:** نظام صلاحيات محكم لـ 3 أنواع من المستخدمين (لوحة تحكم سنتر، حساب مدرس، حساب طالب).
* **💬 Real-Time Chatting:** غرف دردشة فورية مبنية بالكامل باستخدام **WebSockets** للتواصل اللحظي.
* **🔐 Secure Authentication:** نظام تسجيل دخول محكم وآمن يعتمد على الـ JWT و Refresh Tokens وحماية المسارات (Guards).
* **📊 Dynamic Dashboard:** إحصائيات متغيرة وقوية تعرض البيانات والجداول بشكل ريسبونسيف بالكامل.

---

### 🛠️ Tech Stack (التقنيات المستخدمة)

| Architecture Layer | Technologies |
| :--- | :--- |
| **Frontend** | `Next.js 14` • `TypeScript` • `TailwindCSS` • `Framer Motion` |
| **Backend & Real-time** | `NestJS` • `Node.js` • `WebSockets (Socket.io)` |
| **Database & ORM** | `PostgreSQL` • `Prisma ORM` |
| **Hosting & DevOps** | `Railway` • `Docker` |

---

### 📐 Database Schema & Architecture (بنية البيانات)
تشرح هنا بشكل هندسي سريع إزاي مقسم الـ Database والـ Architecture:
* تم استخدام **Prisma ORM** لإدارة العلاقات المعقدة بين الجداول (One-to-Many / Many-to-Many).
* تطبيق هندسة الجداول وتحسين الـ Indexing لتقليل زمن استعلام البيانات (Query Latency) بنسبة **15%**.

---

### 💻 Getting Started (خطوات تشغيل المشروع محلياً)

عشان أي مبرمج تاني ينزل المشروع ويشغله عنده في ثواني، اتبع الخطوات دي:

#### 1️⃣ عمل Clone للمشروع:
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
