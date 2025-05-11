import { motion } from 'framer-motion';

const StatItem = ({ label, value, color, percentage }) => {
  return (
    <div className="flex-1 p-4">
      <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">{label}</div>
      <div className="flex items-end">
        <div className="text-2xl font-bold mr-2" style={{ color }}>{value}</div>
        {percentage && (
          <div className="text-sm pb-1" style={{ color }}>{percentage}%</div>
        )}
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-secondary-100 dark:bg-secondary-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage || 0}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const TaskStatistics = ({ todos }) => {
  if (!todos || !Array.isArray(todos)) {
    return null;
  }
  
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo && todo.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const highPriorityTasks = todos.filter(todo => todo && todo.priority === 'high').length;
  const mediumPriorityTasks = todos.filter(todo => todo && todo.priority === 'medium').length;
  const lowPriorityTasks = todos.filter(todo => todo && todo.priority === 'low').length;
  
  const highPriorityPercentage = totalTasks > 0 ? Math.round((highPriorityTasks / totalTasks) * 100) : 0;
  const mediumPriorityPercentage = totalTasks > 0 ? Math.round((mediumPriorityTasks / totalTasks) * 100) : 0;
  const lowPriorityPercentage = totalTasks > 0 ? Math.round((lowPriorityTasks / totalTasks) * 100) : 0;

  if (totalTasks === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-secondary-800 p-4 rounded-xl shadow-soft mb-6 border border-secondary-100 dark:border-secondary-700"
    >
      <h3 className="text-lg font-medium text-secondary-800 dark:text-secondary-200 px-2 mb-4">Task Statistics</h3>

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-2">
            <div className="mb-4 p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-secondary-500 dark:text-secondary-400">Completion Rate</div>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{completionRate}%</div>
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-secondary-200 dark:bg-secondary-600">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-primary-500 dark:bg-primary-400"
                />
              </div>
            </div>

            <div className="flex justify-between text-sm p-2">
              <div>
                <div className="text-secondary-500 dark:text-secondary-400">Total Tasks</div>
                <div className="text-xl font-bold text-secondary-700 dark:text-secondary-300">{totalTasks}</div>
              </div>
              <div>
                <div className="text-secondary-500 dark:text-secondary-400">Completed</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">{completedTasks}</div>
              </div>
              <div>
                <div className="text-secondary-500 dark:text-secondary-400">Pending</div>
                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{totalTasks - completedTasks}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="p-2">
            <div className="mb-3 text-sm text-secondary-500 dark:text-secondary-400 px-1">Task Priority Breakdown</div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="text-sm text-secondary-700 dark:text-secondary-300 w-20">High</div>
                <div className="flex-1 h-2 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${highPriorityPercentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-red-500"
                  />
                </div>
                <div className="ml-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 w-10">
                  {highPriorityTasks}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="text-sm text-secondary-700 dark:text-secondary-300 w-20">Medium</div>
                <div className="flex-1 h-2 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mediumPriorityPercentage}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-yellow-500"
                  />
                </div>
                <div className="ml-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 w-10">
                  {mediumPriorityTasks}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <div className="text-sm text-secondary-700 dark:text-secondary-300 w-20">Low</div>
                <div className="flex-1 h-2 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lowPriorityPercentage}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <div className="ml-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 w-10">
                  {lowPriorityTasks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskStatistics;
