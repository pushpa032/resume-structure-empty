"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  Briefcase, 
  GraduationCap,
  TrendingUp,
  Lightbulb
} from "lucide-react";

interface ScoreCategory {
  name: string;
  score: number;
  description: string;
  details: string[];
}

interface ResumeAnalysis {
  overallScore: number;
  categories: ScoreCategory[];
  keySkills: string[];
  experienceHighlights: string[];
  recommendations: string[];
}

export default function ResumeScreeningApp() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [clientErrorDetails, setClientErrorDetails] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Reset previous state
    setError(null);
    setAnalysis(null);
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, DOC, or DOCX file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    
    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Global client-side runtime error capture (client-only component)
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      const msg = e?.message || "An unexpected error occurred";
      const details = e?.error?.stack || e?.error?.message || String(e?.error || e?.message || e);
      console.error("Captured error:", e.error || e.message || e);
      setClientError(msg);
      setClientErrorDetails(details);
    };
    const handleRejection = (e: PromiseRejectionEvent) => {
      const reason = e?.reason;
      const msg = (reason && (reason.message || String(reason))) || "Unhandled Promise rejection";
      const details = reason?.stack || String(reason);
      console.error("Captured unhandled rejection:", e.reason || e);
      setClientError(msg);
      setClientErrorDetails(details);
    };
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  const processResume = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Generate mock analysis results
      const mockAnalysis: ResumeAnalysis = {
        overallScore: Math.floor(Math.random() * 41) + 60, // 60-100
        categories: [
          {
            name: "Skills Match",
            score: Math.floor(Math.random() * 31) + 70, // 70-100
            description: "Alignment with required technical skills",
            details: [
              "JavaScript (5 years) - Matched",
              "React (3 years) - Matched",
              "Node.js (2 years) - Matched",
              "Python - Not mentioned"
            ]
          },
          {
            name: "Knowledge Depth",
            score: Math.floor(Math.random() * 36) + 65, // 65-100
            description: "Education and certifications relevance",
            details: [
              "B.S. Computer Science - Matched",
              "AWS Certification - Matched",
              "No advanced degree mentioned"
            ]
          },
          {
            name: "Experience Relevance",
            score: Math.floor(Math.random() * 41) + 60, // 60-100
            description: "Years and role alignment",
            details: [
              "5 years total experience - Matched",
              "3 years in relevant field - Matched",
              "Leadership experience - Partial match"
            ]
          }
        ],
        keySkills: [
          "JavaScript", "React", "Node.js", "AWS", "SQL", 
          "Project Management", "Team Leadership"
        ],
        experienceHighlights: [
          "Senior Frontend Developer at TechCorp (2020-2023)",
          "Led team of 5 developers on major product launch",
          "Reduced page load time by 40% through optimization"
        ],
        recommendations: [
          "Consider for technical interview based on strong skills match",
          "Schedule behavioral interview to assess leadership experience",
          "Verify Python experience if required for the role"
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsProcessing(false);
    }, 2000);
  };

  const resetApp = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsSaved(false);
  };

  const saveResults = () => {
    if (!analysis) return;

    try {
      const json = JSON.stringify(analysis, null, 2);
      // Save to localStorage (guarded)
      try {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
          localStorage.setItem("resumeAnalysis", json);
        }
      } catch (e) {
        // localStorage may be unavailable; ignore gracefully
      }

      // Trigger file download
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      // Use document only if available
      let a: HTMLAnchorElement | null = null;
      if (typeof document !== "undefined") {
        a = document.createElement("a");
      }
      const ts = new Date().toISOString().replace(/[:.]/g, "-");
      if (a) {
        a.href = url;
        a.download = `resume-analysis-${ts}.json`;
        if (document.body) document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (typeof window !== "undefined") {
        // fallback: open in new tab with the blob URL
        window.open(url, "_blank");
      }
      URL.revokeObjectURL(url);

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save results:", err);
      setClientError((err as Error)?.message || String(err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Resume Screening Assistant
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload resumes for instant analysis. Get percentage-based scores and detailed insights to help evaluate candidates efficiently.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Resume Analysis
            </CardTitle>
            <CardDescription>
              Upload a candidate&apos;s resume to receive an automated evaluation
            </CardDescription>
          </CardHeader>
          {clientError && (
            <div className="m-4 p-3 border rounded-md bg-red-50 text-red-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">Client-side error</div>
                  <div className="text-sm mt-1 break-words">{clientError}</div>
                </div>
                <div className="flex-shrink-0 flex gap-2 items-center">
                  <button
                    className="ml-2 px-2 py-1 rounded hover:bg-red-100 bg-white border text-sm"
                    onClick={() => {
                      setClientError(null);
                      setClientErrorDetails(null);
                    }}
                    aria-label="Dismiss client error"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              {clientErrorDetails && (
                <details className="mt-3 bg-white rounded p-2 text-xs text-gray-700">
                  <summary className="cursor-pointer">Show details</summary>
                  <pre className="whitespace-pre-wrap text-xs mt-2">{clientErrorDetails}</pre>
                  <div className="mt-2">
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                      onClick={() => {
                        // Copy details to clipboard
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(clientErrorDetails);
                        }
                      }}
                    >
                      Copy details
                    </button>
                  </div>
                </details>
              )}
            </div>
          )}
          
          <CardContent>
            {!analysis ? (
              <div className="space-y-6">
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}
                  onClick={triggerFileInput}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-lg font-medium text-gray-900">
                      {file ? file.name : 'Drag & drop your resume here'}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {file ? 'Click to change file' : 'or click to browse files'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* File Info */}
                {file && !isProcessing && (
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={resetApp}
                      variant="outline"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={triggerFileInput}
                    variant="outline"
                    className="flex-1"
                  >
                    Browse Files
                  </Button>
                  <Button 
                    onClick={processResume}
                    disabled={!file || isProcessing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
                  </Button>
                </div>

                {/* Processing Indicator */}
                {isProcessing && (
                  <div className="mt-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-center text-gray-600">
                      Analyzing resume for skills, experience, and qualifications...
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Parsing document content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
                        <span className="text-sm text-gray-600">Extracting key skills and experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse delay-200"></div>
                        <span className="text-sm text-gray-600">Calculating compatibility scores</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Results Dashboard */
              <div className="space-y-8">
                {/* Overall Score */}
                <div className="text-center py-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Overall Compatibility</h3>
                  <div className="relative w-48 h-48 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * analysis.overallScore) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Center text */}
                      <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dy="7"
                        fontSize="20"
                        fontWeight="bold"
                        fill="#1f2937"
                      >
                        {analysis.overallScore}%
                      </text>
                    </svg>
                  </div>
                  <p className="mt-4 text-gray-600 max-w-md mx-auto">
                    This candidate shows strong alignment with the role requirements based on skills, experience, and qualifications.
                  </p>
                </div>

                {/* Category Breakdown */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Category Analysis</h3>
                  <div className="space-y-6">
                    {analysis.categories.map((category, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          <Badge 
                            variant={category.score >= 80 ? "default" : category.score >= 60 ? "secondary" : "destructive"}
                            className="text-sm"
                          >
                            {category.score}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                        <Progress value={category.score} className="h-2 mb-3" />
                        <div className="mt-3">
                          <ul className="space-y-1">
                            {category.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Award className="h-5 w-5 text-blue-600" />
                        Key Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keySkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1 font-semibold whitespace-nowrap shadow-sm"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        Experience Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.experienceHighlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                              <GraduationCap className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    onClick={resetApp}
                    variant="outline"
                    className="flex-1"
                  >
                    Analyze Another Resume
                  </Button>
                  <Button
                    onClick={saveResults}
                    disabled={!analysis || isSaved}
                    className="flex-1"
                  >
                    {isSaved ? 'Saved' : 'Save Results'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Resume Screening Assistant v1.0 • All analyses are simulated for demonstration purposes</p>
        </footer>
      </div>
    </div>
  );
}