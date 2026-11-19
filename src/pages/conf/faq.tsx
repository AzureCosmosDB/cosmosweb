import React from "react";
import Layout from "@theme/Layout";
import Accordion from "../../components/Accordion";

const faqs = [
  {
    question: " Where can I see the Azure Cosmos DB Conf 2024 stream?",
    content: `You can find the Azure Cosmos DB Conf 2024 video stream and on-demand sessions on the <a class="blue" href="https://youtube.com/MicrosoftDeveloper">Microsoft Developer YouTube Channel</a>`,
  },
  {
    question: "  Is there a code of conduct for Azure Cosmos DB Conf 2024?",
    content:  `Azure Cosmos DB Conf 2024 falls under the <a class="blue" href="https://developer.microsoft.com/reactor/codeofconduct/">Reactor Code of Conduct</a>.  
    Please report any concerns, suspicious or disruptive activity or behavior via the <a class="blue" href="https://www.microsoft.com/legal/compliance/sbc/standards?activetab=pivot_1%3aprimaryr5">Microsoft Runs on Trust website</a>.`,
  }
];

const FAQ = () => {
  return (
    <Layout title="FAQ" description="Frequently Asked Questions">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Frequently Asked Questions</h1>
        <Accordion items={faqs} textColor="#1e3a8a" />
      </div>
    </Layout>
  );
};

export default FAQ;
