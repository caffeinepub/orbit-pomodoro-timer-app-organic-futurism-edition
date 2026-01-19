# Orbit Pomodoro Timer App - Organic Futurism Edition

## Overview
Orbit is a mobile-first Pomodoro timer application with an "Organic Futurism" design aesthetic. The app features a liquid wave timer animation and atmospheric UI enhancements, helping users manage their work sessions using the Pomodoro technique with smooth, organic animations and an intuitive interface.

## Core Features

### Liquid Wave Timer (Core Feature)
- Large central liquid-style timer with animated wave effect using SVG paths
- Horizontally undulating wave animation powered by Framer Motion
- Vertical 'fill' of the wave smoothly decreases over time as timer progresses
- Two gradient themes:
  - **Focus mode**: Orange to fuchsia glow (#FF6B6B → #d946ef)
  - **Break mode**: Cyan to green glow (#22d3ee → #4ade80)
- Wave animation freezes when paused, dynamically animates when active
- Default 25-minute Focus sessions followed by automatic 5-minute Break sessions
- Timer displays time in MM:SS format overlaid on the liquid wave
- Tap the liquid wave area to start/pause the timer
- When timer reaches 00:00, it automatically switches to "Flow Mode" - counting upward indefinitely

### Timer States
- **Focus Mode**: 25-minute work sessions with orange-fuchsia gradient wave
- **Break Mode**: 5-minute rest sessions with cyan-green gradient wave
- **Flow Mode**: Unlimited count-up mode after completing a session, with gold accent colors

### Task Management
- Editable text (contentEditable) for current task name styled as a floating header
- Task name appears above the liquid wave timer
- Task updates are reflected immediately in the UI
- No modal required - direct inline editing

### Atmospheric UI Enhancements
- Base background: Deep black (bg-zinc-950)
- Subtle fixed film grain overlay with 0.05 opacity, fixed position, pointer-events-none
- Breathing animation: Container scaling subtly between 1 and 1.02 over ~6 seconds continuously
- Smooth background theme transitions between Focus and Break modes using Framer Motion
- Glassmorphism effects with backdrop-blur-xl for overlay elements

### Interaction Design
- Liquid wave area serves as the primary Start/Pause control
- Brown Noise toggle icon (Lucide icon) positioned beside the timer circle
- Brown Noise toggle shows visual state (on/off) but no actual audio implementation yet
- Reset functionality available when timer is paused

### User Interface
- Mobile-first responsive design optimized for smartphones
- Clean centered grid/flex column alignment
- Organic Futurism aesthetic with liquid animations and atmospheric effects
- Smooth animated transitions between different timer states
- Manual toggle option to switch between Focus and Break modes
- Rounded sans-serif typography maintained across all components
- Consistent glassmorphic styling throughout the interface

### Visual Design
- Rounded sans-serif typography
- Lucide React icons throughout the interface
- Framer Motion animations for smooth transitions and liquid wave effects
- Backdrop-blur overlay effects for modals and floating elements
- Film grain texture overlay for atmospheric depth
- Breathing animation for subtle organic movement
- Gradient-based color themes with smooth transitions

## Technical Requirements

### Backend
- Store and manage current task data
- Provide endpoints to read and update the current task
- Persist current task data across user sessions

### Frontend
- Next.js (React) framework
- Tailwind CSS for styling
- Framer Motion for animations, transitions, and liquid wave effects
- Lucide React for icons
- SVG-based liquid wave timer implementation
- Mobile-responsive layout with proper spacing hierarchy
- Timer state management handled entirely in frontend
- Current task data fetched from and synchronized with backend
- CSS definitions for noise texture overlay and breathing animation keyframes
- Smooth background theme transitions with Framer Motion

### Timer Logic
- All timer state and functionality managed in frontend
- Automatic progression from Focus to Break sessions
- Manual mode switching capability
- Flow mode activation after session completion
- Real-time UI updates during timer operation
- Wave animation state synchronized with timer state (pause/play)

## User Experience
- Intuitive tap-to-start/pause interaction on liquid wave
- Smooth visual feedback for all user actions
- Seamless transitions between timer modes with gradient theme changes
- Easy task editing through contentEditable text
- Optimized for single-handed mobile use
- Atmospheric and organic visual experience
- Consistent breathing animation for subtle life-like movement
- Film grain overlay adds texture and depth to the interface
