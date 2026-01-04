#!/usr/bin/env python3
"""
Simple HTTP server for testing the Store Operations Intelligence application.
Run with: python3 server.py
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Server running at http://localhost:{PORT}/")
        print(f"📁 Serving directory: {DIRECTORY}")
        print(f"🌐 Open http://localhost:{PORT}/ in your browser")
        print(f"⏹️  Press Ctrl+C to stop the server\n")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}/')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped.")

if __name__ == "__main__":
    main()

