import * as React from "react"
import {SVGProps} from "react"
import {useTheme} from "@mui/material/styles";

const TransactionIcon = (props: SVGProps<SVGSVGElement>) => {
    const theme = useTheme();

    return (
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill={theme.palette.text.primary}>
            <path
                d="m7.94101676 5.6427832v2.74464258c0 .33989649.27513281.6150293.6150293.6150293.30862393 0 .56440212-.22738249.60835663-.52409402l.00667266-.09093528v-2.74464258h5.65814645v2.74464258c0 .33989649.275543.6150293.6150293.6150293.3089968 0 .5644699-.22738249.6083659-.52409402l.0066634-.09093528v-2.74464258h1.8524297c.7157099 0 1.3265895.52397061 1.44811 1.21681899l.0176654.14071617.9376992 11.81697074c.0730078.9483222-.2554043 1.8905332-.900334 2.5867324-.5953575.6426454-1.4202201 1.03272-2.2901578 1.0889289l-.2183168.0070496h-9.81241403c-.94918359 0-1.8635039-.3997793-2.50847461-1.0959375-.59531971-.6426454-.92094397-1.4949103-.91044964-2.3668484l.00966449-.2182844.93810937-11.82025197c.0545636-.71224914.62412163-1.28073532 1.3241451-1.34901387l.14163029-.00688066zm4.09817114 3.97089698c-.2266736-.00327725-.4135824.17768425-.4169046.40501402v.7555922c-1.4912918.1060463-2.50536524 1.0273421-2.50536524 2.253508 0 1.5045398 1.27919924 1.9221212 2.50536524 2.253508v2.6511967c-.6469005-.0868303-1.2566612-.3552579-1.7564176-.7754643-.09411064-.0748948-.21077995-.1166488-.33140728-.1192943-.30554685.0212051-.54083371.2770409-.5369249.5832645-.00060704.1338754.05174957.2624598.14586021.3579034.68467596.6164053 1.56487397.9710069 2.48549307 1.0008254l.0006563.7430004c.0106025.2266735.2034791.4016467.4301527.3903879.2233717 0 .4043127-.180941.4043127-.4043128v-.7423236c1.8094305-.1192943 2.538506-1.2195419 2.538506-2.3860709 0-1.5642177-1.3122785-2.041436-2.5384649-2.3728433v-2.3330375c.4990796.0841848.9696739.2889765 1.3719974.5965126.0802063.0550021.1743169.0848411.2717499.0861536.3121708 0 .5666941-.251201.5699959-.5633719.0006562-.1338754-.0517004-.2624598-.145811-.3579035-.5812753-.4977671-1.3103508-.7913784-2.0745563-.8351217v-.7821089c0-.22337175-.180941-.40431274-.4043128-.40431274-.0046347-.00070128-.00929-.00070128-.0139248-.00070128zm.4248617 5.91949992c.7489681.2120925 1.3322121.4970904 1.3255881 1.1930252 0 .503735-.3446554 1.1002476-1.3255881 1.2195419zm-.8351218-3.7050349v2.1673339c-.7224514-.2120925-1.2858233-.430809-1.2858233-1.0472142 0-.6164053.510359-1.0604828 1.2858233-1.1201197zm.3712413-10.3281452c2.2382637 0 4.0591523 1.82125781 4.0591523 4.05952148v.08322071h-1.2300175v-.08322071c0-1.56011132-1.2689825-2.8295039-2.8290938-2.8295039s-2.82909373 1.26939258-2.82909373 2.8295039v.08322071h-1.23005859v-.08322071c0-2.23826367 1.82084765-4.05952148 4.05911132-4.05952148z"/>
        </svg>
    )
}

export default TransactionIcon
