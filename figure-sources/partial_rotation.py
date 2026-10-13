"""Regenerate the schematic with English lettering and mathematical glyphs."""
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse, Rectangle, FancyArrowPatch

plt.rcParams.update({"font.family": "DejaVu Serif", "svg.fonttype": "path"})
fig, ax = plt.subplots(figsize=(9.75, 4))
fig.patch.set_facecolor("white")
ax.set(xlim=(0, 780), ylim=(0, 320))
ax.axis("off")
ax.add_patch(Rectangle((100, 78), 286, 160, facecolor="#d8eee5", edgecolor="#12634c", lw=1.8))
ax.add_patch(Rectangle((386, 78), 266, 160, facecolor="#edf0f3", edgecolor="#455266", lw=1.8))
ax.add_patch(Ellipse((652, 158), 68, 160, facecolor="#edf0f3", edgecolor="#455266", lw=1.8))
ax.add_patch(Rectangle((386, 80), 266, 156, facecolor="#edf0f3", edgecolor="none"))
ax.add_patch(Ellipse((100, 158), 68, 160, facecolor="#c2e2d4", edgecolor="#12634c", lw=1.8))
ax.add_patch(Ellipse((386, 158), 68, 160, facecolor="none", edgecolor="#b62756", lw=2, ls="--"))
ax.add_patch(FancyArrowPatch((210, 116), (216, 208), connectionstyle="arc3,rad=.5", arrowstyle="-|>", mutation_scale=20, color="#12634c", lw=2))
ax.plot([122, 148], [250, 284], color="#455266", lw=1)
ax.plot([386, 386], [250, 284], color="#455266", lw=1)
def text(x, y, value, size=14, **kwargs):
    ax.text(x, y, value, fontsize=size, color="#20272f", **kwargs)
text(150, 292, "Physical boundary")
text(396, 292, "Entanglement cut")
text(274, 150, r"$A$", 24)
text(532, 150, r"$B$", 24)
text(182, 43, r"Translate by $L/n$")
text(518, 43, "Fixed")
text(65, 9, "Left edge: ground state", 12)
text(340, 9, "Cut edge: entanglement spectrum", 12)
fig.subplots_adjust(left=0, right=1, bottom=0, top=1)
output = Path(__file__).resolve().parents[1] / "public/diagrams/partial-rotation.svg"
fig.savefig(output, format="svg", facecolor="white", metadata={"Date": None})
plt.close(fig)
