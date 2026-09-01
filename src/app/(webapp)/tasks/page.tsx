import { getMyTasks } from "@/features/task/actions";
import TasksDashboard from "@/features/task/components/TaskDashboard";
import { getMyRegistrationsWithLectureName } from "@/features/timetable/actions/registrations";
import { getCurrentTerm } from "@/features/timetable/actions/terms";
import { Box, Heading, type SelectItem, VStack } from "@yamada-ui/react";

export const dynamic = "force-dynamic";

const TasksPage = async () => {
  const term = await getCurrentTerm();
  const [tasks, registrations] = await Promise.all([
    getMyTasks(),
    getMyRegistrationsWithLectureName(term),
  ]);

  const lectureItems: SelectItem[] = registrations.map(r => ({
    label: r.lecture.name,
    value: String(r.id),
  }));

  return (
    <VStack w="full" align="start">
      <Box w="full">
        <Heading size="xl" mb={2}>
          タスク管理
        </Heading>
      </Box>

      {/* タスクダッシュボード */}
      <Box w="full">
        <TasksDashboard initialTasks={tasks} lectureItems={lectureItems} />
      </Box>
    </VStack>
  );
};

export default TasksPage;
