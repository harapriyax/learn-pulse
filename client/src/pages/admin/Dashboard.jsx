import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, ShoppingCart, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <Loader2 className='h-8 w-8 animate-spin text-primary' />
    </div>
  );
  if (isError) return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <p className='text-destructive font-medium'>Failed to load dashboard data</p>
    </div>
  );

  const purchasedCourse = data?.purchasedCourse || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId?.courseTitle || "Unknown",
    price: course.courseId?.coursePrice || 0
  }))

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-extrabold text-3xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your course performance</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingCart size={18} className="text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold gradient-text">{totalSales}</p>
            <p className="text-xs text-muted-foreground mt-1">Courses sold</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-green-500/10 flex items-center justify-center">
              <DollarSign size={18} className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-green-600">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Price</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <TrendingUp size={18} className="text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-amber-600">₹{totalSales > 0 ? Math.round(totalRevenue / totalSales).toLocaleString() : 0}</p>
            <p className="text-xs text-muted-foreground mt-1">Per course</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Course Revenue Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Revenue breakdown by course</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={12}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Price"]}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ stroke: "#6366f1", strokeWidth: 2, r: 5, fill: "white" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;