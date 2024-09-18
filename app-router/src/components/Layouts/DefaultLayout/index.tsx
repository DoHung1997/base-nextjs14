import React, {ReactNode} from 'react';
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

const DefaultLayout = ({children}: { children: ReactNode }) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default DefaultLayout;