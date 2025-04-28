import parse from "html-react-parser";

// Helper function to wrap <table> elements with a responsive div
function wrapTablesInDiv(htmlString) {
  // Replace <table> with a wrapper div and apply Tailwind's responsive classes
  return htmlString.replace(
    /<table(.*?)>([\s\S]*?)<\/table>/g,
    `<div class="overflow-x-auto my-6"><table class="min-w-full table-auto border border-gray-300 text-sm"$1>$2</table></div>`
  );
}

export  default wrapTablesInDiv;
