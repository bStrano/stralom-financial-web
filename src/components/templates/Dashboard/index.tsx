import * as React from 'react';
import {DashboardContent} from "./DashboardContent";

interface DashboardContentProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    topContent?: React.ReactNode;
}

export default function Core({children, title, subtitle, topContent}: DashboardContentProps) {
    return <DashboardContent title={title} subtitle={subtitle} topContent={topContent}>{children}</DashboardContent>;
}
