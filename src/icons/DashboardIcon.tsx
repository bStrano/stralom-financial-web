import * as React from "react"
import { SVGProps } from "react"
import {useTheme} from "@mui/material/styles";

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => {
    const theme = useTheme();
    return (
        <svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill={theme.palette.text.primary} {...props}>
            <path
                d="M20.248 1a1.833 1.833 0 1 1-.873 3.446l-3.025 3.48a1.833 1.833 0 1 1-3.454.945l-2.203-.759a1.83 1.83 0 0 1-2.315.432l-2.876 2.413a1.833 1.833 0 1 1-.84-1.044l2.87-2.408a1.833 1.833 0 1 1 3.577-.668l2.215.764a1.83 1.83 0 0 1 2.012-.551l3.169-3.646A1.833 1.833 0 0 1 20.248 1z"
                opacity={0.48}
            />
            <path d="M21.167 9.609c.506 0 .916.41.916.916V21.28a.5.5 0 0 1-.5.5h-2.666a.5.5 0 0 1-.5-.5V10.525c0-.506.41-.916.916-.916zm-5.5 6.425c.506 0 .916.41.916.917v4.328a.5.5 0 0 1-.5.5h-2.666a.5.5 0 0 1-.5-.5v-4.328c0-.507.41-.917.916-.917zm-5.5-1.84c.506 0 .916.41.916.916v6.17a.5.5 0 0 1-.5.5H7.917a.5.5 0 0 1-.5-.5v-6.17c0-.506.41-.917.916-.917zm-5.5 4.713c.506 0 .916.41.916.917v1.455a.5.5 0 0 1-.5.5H2.417a.5.5 0 0 1-.5-.5v-1.455c0-.507.41-.917.916-.917z" />
        </svg>
    )
}

export default DashboardIcon
