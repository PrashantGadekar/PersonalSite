# Personal Site PWA

A Progressive Web App (PWA) built with React and Vite, featuring beautiful animations and modern design.

## 🚀 Features

- **Progressive Web App** - Works offline and can be installed on devices
- **Beautiful Login System** - Glass morphism design with animated floating balls
- **Dashboard with Tiles** - Finance, To-Do List, and Goals management
- **Mobile Responsive** - Works perfectly on all device sizes
- **Smooth Animations** - Powered by Framer Motion
- **File System Access** - Interact with mobile folders (where supported)
- **Modern Styling** - Custom CSS with gradients and backdrop filters

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Custom CSS** - Modern styling with glass morphism effects

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-site-pwa.git
cd personal-site-pwa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Default Login Credentials

- **Username:** user1, **Password:** pass1
- **Username:** user2, **Password:** pass2

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Login page component
│   ├── Login.css          # Login page styles
│   ├── Dashboard.jsx      # Dashboard component
│   ├── Dashboard.css      # Dashboard styles
│   ├── AppRouter.jsx      # Routing configuration
│   └── NotFound.jsx       # 404 page
├── App.jsx                # Main app component
├── main.jsx              # Entry point
├── pwa.js                # Service worker registration
└── index.css             # Global styles
```

## 🎨 Features Overview

### Login Page
- Black background with floating animated balls
- Glass morphism login card
- Responsive two-panel layout (welcome text + login form)
- Smooth entrance animations

### Dashboard
- Consistent black background with floating balls
- Interactive tiles for different features
- Beautiful gradient hover effects
- Mobile-responsive grid layout

### PWA Features
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all devices

## 🚀 Building for Production

```bash
npm run build
```

## 📱 PWA Installation

The app can be installed on devices that support PWA installation. Look for the "Install" prompt in your browser or add it to your home screen on mobile devices.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by [Your Name]

---

⭐ Star this repo if you found it helpful!
