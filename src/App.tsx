import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Landing } from '@/screens/Landing';
import { Wizard } from '@/screens/Wizard';
import { Results } from '@/screens/Results';
import { History } from '@/screens/History';

const SCREENS = {
  landing: Landing,
  wizard: Wizard,
  results: Results,
  history: History,
} as const;

export default function App() {
  const route = useStore((s) => s.route);
  const Screen = SCREENS[route];

  return (
    <div className="min-h-[100dvh] bg-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
