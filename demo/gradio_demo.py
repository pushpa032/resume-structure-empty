import json
import gradio as gr
import argparse
from datetime import datetime

# Simple mock analysis function
SUPPORTED_EXTENSIONS = (".pdf", ".doc", ".docx")


def analyze_resume(file):
    if not file:
        return {
            "error": "No file uploaded",
            "analysis": None
        }

    filename = file.name if hasattr(file, "name") else "upload"
    # Simulate a lightweight parsing and scoring
    skills = ["JavaScript", "React", "TypeScript"]
    experience_years = 3
    scores = {
        "skills_match": 0.82,
        "knowledge_depth": 0.75,
        "experience_relevance": 0.67
    }

    result = {
        "filename": filename,
        "upload_time": datetime.utcnow().isoformat() + "Z",
        "skills_extracted": skills,
        "experience_years": experience_years,
        "scores": scores,
        "summary": "Candidate looks promising — strengths in React + TypeScript, moderate backend exposure."
    }

    return {
        "analysis": result,
        "error": None
    }


# Gradio UI
with gr.Blocks() as demo:
    gr.Markdown("# Resume Screening Agent — Live Demo (Mock)")
    gr.Markdown(
        "Upload a resume (PDF/DOC/DOCX). This demo returns a simulated analysis and scoring; real AI analysis requires backend/OpenAI integration."
    )

    with gr.Row():
        upload = gr.File(file_types=[".pdf", ".doc", ".docx"], label="Upload resume")
        analyze_button = gr.Button("Analyze")

    output_json = gr.JSON(label="Analysis Result")

    def run_analysis(file):
        result = analyze_resume(file)
        if result["error"]:
            return {"error": result["error"]}
        return result["analysis"]

    analyze_button.click(fn=run_analysis, inputs=upload, outputs=output_json)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the Gradio demo app")
    parser.add_argument("--share", action="store_true", help="Create a public Gradio share link")
    parser.add_argument("--port", type=int, default=7860, help="Port to run the server on")
    args = parser.parse_args()
    demo.launch(share=args.share, server_port=args.port)
