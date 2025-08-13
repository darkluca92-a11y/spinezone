"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-blue-500/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-blue-200/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(59,130,246,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function GeometricBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/50 to-green-50/30">
            {/* Healthcare-themed background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-green-500/[0.03] blur-3xl" />

            {/* Floating healthcare-themed shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-500/[0.12]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-green-500/[0.12]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-teal-500/[0.12]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-blue-400/[0.12]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-green-400/[0.12]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
                {/* Additional subtle medical-themed shapes */}
                <ElegantShape
                    delay={0.8}
                    width={120}
                    height={35}
                    rotate={18}
                    gradient="from-cyan-500/[0.08]"
                    className="right-[30%] md:right-[35%] bottom-[15%] md:bottom-[20%]"
                />
                <ElegantShape
                    delay={0.9}
                    width={80}
                    height={25}
                    rotate={-12}
                    gradient="from-emerald-500/[0.08]"
                    className="left-[40%] md:left-[45%] top-[25%] md:top-[30%]"
                />
            </div>
            
            {/* Content container */}
            <div className="relative z-10 w-full">{children}</div>
            
            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
        </div>
    );
}