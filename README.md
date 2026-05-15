# Chris Rosa - Personal Website

A modern, responsive personal portfolio website built with clean HTML, CSS, and vanilla JavaScript.

## 🚀 Quick Start - Deploy to GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `chrisrosadotcom.github.io` (replace `chrisrosadotcom` with your actual GitHub username)
3. Make it **Public**
4. Click "Create repository"

### Step 2: Upload Your Website
**Option A: Using Git (Recommended)**
```bash
cd c:\Users\chrisrosa\DEV\Website
git init
git add .
git commit -m "Initial commit: Personal website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chrisrosadotcom.github.io.git
git push -u origin main
```

**Option B: Upload via GitHub Web Interface**
1. Go to your new repository
2. Click "Add file" → "Upload files"
3. Drag and drop `index.html` (and any other files)
4. Commit the files

### Step 3: Enable GitHub Pages
1. Go to your repository Settings → Pages
2. Under "Source," select "Deploy from a branch"
3. Select "main" branch and "root" folder
4. Click "Save"

### Step 4: Your Site is Live! 🎉
Your website will be available at: **`https://chrisrosadotcom.github.io`**

*Note: Replace `chrisrosadotcom` with your actual GitHub username*

---

## 📝 Customization Guide

### Essential Updates
Before deploying, update these sections in `index.html`:

1. **About Section** (Line ~380)
   - Replace placeholder text with your actual bio
   - Update location, experience, and education

2. **Skills Section** (Line ~430)
   - Customize skill categories and items based on your expertise

3. **Contact Section** (Line ~470)
   - Update LinkedIn URL
   - Add GitHub repository URL
   - Replace email address

4. **Projects Section** (Line ~455)
   - Uncomment and duplicate the example project card
   - Add your actual projects with descriptions

### Design Features
- ✅ **Dark/Light Theme Toggle** - User preference respects system settings
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Smooth Animations** - Cards lift on hover, theme transitions smoothly
- ✅ **Professional Color Scheme** - Clawpilot theme with deep rose accents
- ✅ **Fast Loading** - Single HTML file, no dependencies

### Color Customization
The site uses CSS variables for theming. To customize colors, edit the CSS variables at the top of the `<style>` block:
- `--cp-accent`: Primary accent color (currently deep rose)
- `--cp-text`: Main text color
- `--cp-bg`: Background color

---

## 📱 Browser Compatibility
- ✅ Chrome / Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## 🔗 Your GitHub Pages URL
Once deployed, your website will be live at:
```
https://chrisrosadotcom.github.io
```

---

## 💡 Tips
- Test locally by opening `index.html` in your browser
- Use the theme toggle button to test dark/light modes
- Keep your README.md updated in the repo root
- Consider adding a custom domain later (GitHub Pages supports this)

---

Good luck with your personal website! 🚀
