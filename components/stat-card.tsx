import React, { ReactElement } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProp {
  title: string;
  description: string;
  icon: ReactElement;
  loading: boolean;
  value?: string;
}

function StatCard({ title, description, icon, value, loading }: StatCardProp) {
  return loading ? (
    <Skeleton className='h-[140px] w-full rounded-md' />
  ) : (
    <Card>
      <CardHeader className='flex flex-row items-center gap-3'>
        <span className='flex items-center justify-center bg-blue-400/30 border-2 border-blue-400 h-10 w-10 rounded-md text-blue-400'>
          {icon}
        </span>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{value}</p>
      </CardContent>
    </Card>
  )
}

export default StatCard
