import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    analytics: ReactNode;
    team: ReactNode;
}
const Layout = ({ children, analytics, team }: Props) => {
    return (
        <div>
            {children}
            {analytics}
            {team}
        </div>
    );
};

export default Layout;
