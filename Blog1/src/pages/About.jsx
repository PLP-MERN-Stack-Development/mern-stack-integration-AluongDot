import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      {/* Header Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          About the MERN Blog Page.
        </h1>

        <p className="text-lg mb-6 text-center">
          <strong>Deep Dive into MERN Stack Integration</strong>
        </p>

        <p className="mb-4 text-gray-700 text-center">
          This project demonstrates a complete full-stack web application built
          with the <strong>MERN stack</strong> — <em>MongoDB, Express.js, React.js,
          and Node.js</em>. The goal is to achieve seamless integration between
          front-end and back-end systems, covering database operations, API
          communication, and front-end state management.
        </p>
      </div>

      {/* Objectives Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-3 text-blue-500">
          🌟 Project Objectives
        </h2>
        <ul className="list-disc pl-8 mb-6 text-gray-700 space-y-2">
          <li>Set up a well-structured client-server MERN project.</li>
          <li>Implement CRUD operations for blog posts and categories.</li>
          <li>Integrate React with Express and MongoDB using RESTful APIs.</li>
          <li>Handle authentication, validation, and error management.</li>
          <li>Enhance UX with optimistic updates, pagination, and filtering.</li>
        </ul>
      </div>

      {/* Technologies Used Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-3 text-blue-500">
          🧰 Technologies Used
        </h2>
        <ul className="list-disc pl-8 mb-6 text-gray-700 space-y-2">
          <li>React.js (Frontend framework with hooks and routing)</li>
          <li>Node.js & Express.js (Backend server and API handling)</li>
          <li>MongoDB & Mongoose (Database and schema management)</li>
          <li>Axios (HTTP requests and API communication)</li>
          <li>Vite (Frontend development environment)</li>
        </ul>
      </div>

      {/* Expected Outcome Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-3 text-blue-500">
          🚀 Expected Outcome
        </h2>
        <p className="text-gray-700 mb-6">
          The final product is a fully functional, responsive blog application
          demonstrating integration between all layers of the MERN stack. It
          includes features such as user authentication, image uploads,
          comments, pagination, and category-based filtering.
        </p>
      </div>

      {/* Deliverables Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-semibold mb-3 text-blue-500">
          📁 Deliverables
        </h2>
        <ul className="list-disc pl-8 text-gray-700 space-y-2">
          <li>Client and Server code with environment configuration</li>
          <li>API Documentation and README.md</li>
          <li>Screenshots and setup instructions</li>
          <li>Functional submission through GitHub Classroom</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
