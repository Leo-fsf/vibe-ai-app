import { motion } from 'framer-motion'

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const slideLeft = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const cardHover = {
  whileHover: {
    scale: 1.02,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
}

export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: {
    duration: 0.1,
    ease: 'easeInOut',
  },
}
