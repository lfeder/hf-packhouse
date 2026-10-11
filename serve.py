"""Serve the repo on localhost with caching off, so an edit shows on reload.

    python3 serve.py            # http://localhost:8765
    python3 serve.py 9000

Plain `python3 -m http.server` lets the browser cache `packhouse-layouts.js` and
`site-plan-option5.jpg`, which keep their names when they change — so a reload shows
the old drawing and nothing looks like it happened. This sends no-store on everything.
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):      # one line per request is enough
        sys.stderr.write("%s %s\n" % (self.command, self.path))


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
print(f"http://localhost:{port}/packhouse/site-placement.html  (ctrl-c to stop)")
ThreadingHTTPServer(("127.0.0.1", port), partial(NoCache, directory=".")).serve_forever()
