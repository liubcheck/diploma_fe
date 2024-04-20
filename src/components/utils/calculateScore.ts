import {Task} from '../../redux/slices/taskSlice';

export const calculateScore = (
  tasks: Task[],
  answers: {[key: number]: string},
  currentTaskIndex: number,
  onComplete: (score: number) => void
) => {
  let score = 0;
  tasks.forEach(task => {
    if (task.rightAnswer && answers[task.id] === task.rightAnswer) {
      score += 1;
    } else if (task.variants) {
      const correctVariant = task.variants.find(variant => variant.isRight);
      if (correctVariant && answers[task.id] === correctVariant.value) {
        score += 1;
      }
    }
  });
  if (currentTaskIndex === tasks.length - 1) {
    onComplete(score);
  }
};
