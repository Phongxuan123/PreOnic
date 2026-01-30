import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ==================== ANIMATION VARIANTS ====================

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const scaleInBounce = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Stagger container for children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

// Slide animations
export const slideInLeft = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const slideInRight = {
  hidden: { x: "100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Float animation (continuous)
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Button hover animation
export const buttonHover = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95 
  }
};

// Card hover animation
export const cardHover = {
  hover: { 
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 }
  }
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

// ==================== ANIMATION COMPONENTS ====================

// Scroll-triggered animation wrapper
export const ScrollReveal = ({ 
  children, 
  variants = fadeInUp, 
  className = "",
  delay = 0,
  threshold = 0.2,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation wrapper
export const StaggerWrapper = ({ 
  children, 
  className = "",
  fast = false 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fast ? staggerContainerFast : staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hover animation wrapper
export const HoverWrapper = ({ 
  children, 
  className = "",
  scale = 1.05 
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Float animation component
export const FloatElement = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Animated button component
export const AnimatedButton = ({ 
  children, 
  className = "", 
  onClick,
  type = "button"
}) => {
  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(19, 236, 55, 0.3)"
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
};

// Animated card component  
export const AnimatedCard = ({ 
  children, 
  className = "",
  delay = 0
}) => {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)"
      }}
      transition={{ 
        duration: 0.3,
        delay 
      }}
    >
      {children}
    </motion.div>
  );
};

// Page wrapper with transitions
export const PageWrapper = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// Text reveal animation (letter by letter)
export const TextReveal = ({ text, className = "" }) => {
  const words = text.split(" ");
  
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: i * 0.1 
          }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Counter animation for stats
export const AnimatedCounter = ({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span ref={ref}>
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {prefix}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.span>
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
};

// Parallax scroll component
export const ParallaxElement = ({ children, speed = 0.5, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: -30 * speed }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export { motion, AnimatePresence };
