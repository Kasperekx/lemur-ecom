import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { steps } from './CartSteps';

interface StepItemProps {
  step: (typeof steps)[number];
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

export function StepItem({
  step,
  index,
  isCompleted,
  isCurrent,
}: StepItemProps) {
  return (
    <div className="flex flex-col items-center">
      <Link
        href={step.path}
        className={cn(
          'flex flex-col items-center gap-2',
          (isCompleted || isCurrent) && 'cursor-pointer',
          !isCompleted && !isCurrent && 'cursor-default pointer-events-none'
        )}
      >
        <StepCircle
          index={index}
          isCompleted={isCompleted}
          isCurrent={isCurrent}
        />
        <StepLabel
          label={step.label}
          isCompleted={isCompleted}
          isCurrent={isCurrent}
        />
      </Link>
    </div>
  );
}

interface StepCircleProps {
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

function StepCircle({ index, isCompleted, isCurrent }: StepCircleProps) {
  return (
    <div
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200',
        isCompleted
          ? 'border-secondary bg-secondary text-white'
          : isCurrent
          ? 'border-secondary bg-white text-secondary'
          : 'border-gray-200 text-gray-400'
      )}
    >
      {isCompleted ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  );
}

interface StepLabelProps {
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

function StepLabel({ label, isCompleted, isCurrent }: StepLabelProps) {
  return (
    <span
      className={cn(
        'text-sm font-medium hidden sm:block',
        isCompleted && 'text-secondary',
        isCurrent && 'text-secondary',
        !isCompleted && !isCurrent && 'text-gray-400'
      )}
    >
      {label}
    </span>
  );
}

interface ProgressBarProps {
  currentStepIndex: number;
  totalSteps: number;
}

export function ProgressBar({
  currentStepIndex,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
      <div
        className="absolute h-full bg-secondary transition-all duration-500"
        style={{
          width: `${(currentStepIndex / (totalSteps - 1)) * 100}%`,
        }}
      />
    </div>
  );
}
