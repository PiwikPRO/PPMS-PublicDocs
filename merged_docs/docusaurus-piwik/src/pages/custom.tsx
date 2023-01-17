import React, { Suspense } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { Fallback } from "../components/Fallback";

const LazyStoplight = React.lazy(() => import("../components/Stoplight"));

export default function Api() {
    return (
        <Layout title="API example">
            <BrowserOnly>
                {() => (
                    <Suspense fallback={Fallback}>
                        <LazyStoplight apiDescriptionUrl="http://localhost:3000/img/openapi.json" />
                    </Suspense>
                )}
            </BrowserOnly>
        </Layout>
    );
}
