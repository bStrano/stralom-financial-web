import {Box, BoxProps} from "@mui/material";
import * as url from "url";


interface Props extends BoxProps {
    src: string;
}

export default function SvgIconStyle({src, sx}: Props) {
    return (
        <Box
            component="span"
            sx={{
                width: 24,
                height: 24,
                display: 'inline-block',
                bgcolor: 'currentColor',
                mask: url(${src}),
                WebkitMask: `url(${src}) no-repeat center / contain`,
                ...sx,
            }}
        />
    );
}
