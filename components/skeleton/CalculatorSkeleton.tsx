import { Header } from "../Header";
import { TabNavigationSkeleton } from "./TabNavigationSkeleton";
import { CustomResourceCalculatorSkeleton } from "./CustomResourceCalculatorSkeleton";

export default function CalculatorSkelton() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-0 md:px-10 lg:px-20 py-6">
        <Header />
        <div className="mt-6">
          <TabNavigationSkeleton />
          <div className="mt-8">
            <CustomResourceCalculatorSkeleton />
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Rate Card for Hub71 - 2025
        </div>
      </div>
    </div>
  );
}
