import { Progress } from "@/components/ui/progress"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <div className="bg-black/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-green-500/10 hover:border-green-500/30">
      <div className="font-medium mb-2 text-white">{name}</div>
      <Progress value={level} className="h-2 bg-gray-800" indicatorClassName="bg-green-500" />
      <div className="text-xs text-right mt-1 text-gray-400">{level}%</div>
    </div>
  )
}

