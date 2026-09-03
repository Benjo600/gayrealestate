#!/usr/bin/env python3
"""Generate data/augustBlogs2026.ts from the reviewed August SEO blog drafts."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "scripts"))
from build_final_seo_blogs import posts  # noqa: E402

AUTHORS = [
    ("Arek Wtulich", "Licensed CT Realtor & LGBTQ+ Community Advocate"),
    ("Travis Lipinski", "Licensed CT Realtor | Litchfield County Specialist"),
    ("Abby Dudarewicz", "Licensed CT Realtor & LGBTQ+ Community Advocate"),
]

CATEGORIES = [
    "BUYING GUIDE",
    "BUYING GUIDE",
    "BUYING GUIDE",
    "BUYING GUIDE",
    "BUYING GUIDE",
    "FINANCE & MORTGAGES",
    "BUYING GUIDE",
    "FINANCE & MORTGAGES",
    "FINANCE & MORTGAGES",
    "FINANCE & MORTGAGES",
    "BUYING GUIDE",
    "SELLING GUIDE",
    "RELOCATION GUIDE",
    "NEIGHBORHOOD GUIDE",
    "RETIREMENT GUIDE",
]

READ_TIMES = [
    "7 MIN READ",
    "7 MIN READ",
    "7 MIN READ",
    "8 MIN READ",
    "7 MIN READ",
    "7 MIN READ",
    "8 MIN READ",
    "8 MIN READ",
    "7 MIN READ",
    "8 MIN READ",
    "7 MIN READ",
    "7 MIN READ",
    "8 MIN READ",
    "8 MIN READ",
    "7 MIN READ",
]

SEO_KEYWORDS = [
    "Connecticut radon testing, radon home inspection CT, radon mitigation Connecticut, home buyers radon test",
    "underground oil tank Connecticut, oil tank sweep CT, buried oil tank home buyers, oil heat Connecticut",
    "well water septic Connecticut, private well home inspection CT, septic inspection Connecticut buyers",
    "older home Connecticut, lead paint asbestos CT, knob and tube wiring Connecticut, historic home inspection",
    "Connecticut seller disclosure, seller disclosure form CT, home buyer due diligence Connecticut",
    "appraisal gap Connecticut, low appraisal home purchase CT, appraisal contingency Connecticut",
    "Connecticut real estate contingencies, inspection contingency CT, financing contingency Connecticut",
    "FHA vs conventional Connecticut, first time buyer loans CT, FHA loan Connecticut, conventional mortgage CT",
    "VA home loan Connecticut, zero down VA loan CT, veterans home buying Connecticut",
    "how much house afford Connecticut, Connecticut property taxes insurance HOA, home affordability CT",
    "solar panels home sale Connecticut, solar lease transfer CT, buying home with solar Connecticut",
    "selling home after divorce Connecticut, divorce home sale CT, marital home equity Connecticut",
    "moving New Jersey to Connecticut LGBTQ, NJ to CT relocation, Connecticut towns taxes commute",
    "Fairfield County LGBTQ buyers, Greenwich Stamford Norwalk Westport, gay friendly Fairfield County CT",
    "LGBTQ senior living Connecticut, LGBTQ retirement housing CT, senior housing Connecticut gay friendly",
]

# Reviewed doc shortened this title vs the source draft.
TITLE_OVERRIDES = {
    "connecticut-real-estate-contingencies-explained": (
        "Connecticut Real Estate Contingencies Explained: Inspection, Financing & Appraisal"
    ),
}

CTA = (
    "Use this guide to prepare your questions before you make or accept an offer. "
    "A local, LGBTQ+-affirming real estate professional can help you connect the property details, "
    "financing, inspection findings, and Connecticut closing process to the decision that fits your life."
)

RELATED = (
    '<p>Related: '
    '<a href="/blog/how-to-buy-home-connecticut-lgbtq" class="text-brand-600 hover:underline font-bold">How to buy a home in CT</a> · '
    '<a href="/blog/connecticut-closing-costs" class="text-brand-600 hover:underline font-bold">Connecticut closing costs</a> · '
    '<a href="/blog/connecticut-property-taxes-by-town" class="text-brand-600 hover:underline font-bold">Property taxes by town</a></p>'
)


def word_count(text: str) -> int:
    return len(re.findall(r"\w+", text))


def build_content(post: dict) -> str:
    parts = [f'      <p class="lead-paragraph">{post["lead"]}</p>']
    for heading, body in post["sections"]:
        parts.append(f"      <h2>{heading}</h2>")
        parts.append(f"      <p>{body}</p>")
    parts.append("      <h2>What to do next</h2>")
    parts.append(f"      <p>{CTA}</p>")
    parts.append(
        '      <p><a href="/contact" class="text-brand-600 hover:underline font-bold">Contact GayRealEstateCT</a></p>'
    )
    parts.append(f"      {RELATED.strip()}")
    return "\n".join(parts)


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def main() -> None:
    start_id = 57
    dates = [f"2026-08-{day:02d}" for day in range(1, 30, 2)]
    lines = [
        "/** August 2026 batch — 15 SEO due-diligence & finance posts from reviewed client drafts. */",
        "export const AUGUST_2026_BLOGS = [",
    ]

    for i, post in enumerate(posts):
        blog_id = start_id + i
        slug = post["slug"]
        title = TITLE_OVERRIDES.get(slug, post["title"])
        excerpt = post["meta"]
        author, author_role = AUTHORS[i % len(AUTHORS)]
        content = build_content(post)
        faq_items = ",\n      ".join(
            f'{{ question: {ts_string(q)}, answer: {ts_string(a)} }}' for q, a in post["faq"]
        )
        image = f"/images/blog-heroes/august-2026/{slug}-hero.jpg"

        lines.extend(
            [
                "  {",
                f"    id: {blog_id},",
                f"    slug: {ts_string(slug)},",
                f"    title: {ts_string(title)},",
                f"    excerpt: {ts_string(excerpt)},",
                f"    seoKeywords: {ts_string(SEO_KEYWORDS[i])},",
                f"    content: `\n{content}\n    `,",
                "    faq: [",
                f"      {faq_items}",
                "    ],",
                f"    image: {ts_string(image)},",
                f"    category: {ts_string(CATEGORIES[i])},",
                f"    date: {ts_string(dates[i])},",
                f"    readTime: {ts_string(READ_TIMES[i])},",
                f"    author: {ts_string(author)},",
                f"    authorRole: {ts_string(author_role)},",
                "  }," if i < len(posts) - 1 else "  }",
            ]
        )

    lines.append("];")
    lines.append("")
    out = ROOT / "data" / "augustBlogs2026.ts"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out} ({len(posts)} posts, ids {start_id}-{start_id + len(posts) - 1})")


if __name__ == "__main__":
    main()
