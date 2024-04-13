"use client";

import React, { useState } from "react";
// import "jodit";
// import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const copyStringToClipboard = function (str: string) {
  var el: any = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation",
];
const inspectionMergeFields = ["InspectionCompleteDate", "InspectionEventType"];
const createOptionGroupElement = (mergeFields: any, optionGrouplabel: any) => {
  let optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
};
const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
  {
    name: "insertMergeField",
    tooltip: "Insert Merge Field",
    iconURL: "images/merge.png",
    popup: (editor: any, current: any, self: any, close: any) => {
      function onSelected(e: any) {
        let mergeField = e.target.value;
        if (mergeField) {
          console.log(mergeField);
          editor.selection.insertNode(
            editor.create.inside.fromHTML("{{" + mergeField + "}}")
          );
        }
      }
      let divElement = editor.create.div("merge-field-popup");

      let labelElement: any = document.createElement("label");
      labelElement.setAttribute("class", "merge-field-label");
      labelElement.text = "Merge field: ";
      divElement.appendChild(labelElement);

      let selectElement = document.createElement("select");
      selectElement.setAttribute("class", "merge-field-select");
      selectElement.appendChild(
        createOptionGroupElement(facilityMergeFields, "Facility")
      );
      selectElement.appendChild(
        createOptionGroupElement(inspectionMergeFields, "Inspection")
      );
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      console.log(divElement);
      return divElement;
    },
  },
  {
    name: "copyContent",
    tooltip: "Copy HTML to Clipboard",
    iconURL: "images/copy.png",
    exec: function (editor: any) {
      let html = editor.value;
      copyStringToClipboard(html);
    },
  },
];

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true,
  },
  width: 800,
  height: 842,
};

const initialContent = `
<p>TRY COPY CONTENT FROM A WORD AND PASTE HERE.</p><hr>

<p><strong>Email Inspection Form (From Inspection Details)<img src="blob:http://localhost:3000/89acddf1-1823-4129-881a-6b83210d401e" style="float: right;"></strong>
</p><p><br></p><p>Subject: May 23 2019 Compliance Inspection for&nbsp;{{FacilityName}}</p><p> 
(ie. {{InspectionCompleteDate}} {{InspectionEventType}} “Inspection”)
</p><p><br></p><p>An inspection of Carl's Jr (FSE-0004) located at 65 Rogers Road Patterson, CA 95363 was completed on May 23 2019.
</p><p>A copy of the inspection report is available here:&nbsp;<a href="www.open.linkoonline.com/asdfajjhafjasdfajsjfdjhafd">www.open.linkoon</a><a href="www.open.linkoonline.com/asdfajjhafjasdfajsjfdjhafd">line.com/asdfajjhafjasdfajs</a><a href="www.open.linkoonline.com/asdfajjhafjasdfajsjfdjhafd">jfdjhafd</a></p><h1><br></h1><p>
If you have any questions or concerns, please contact us.
</p><p>Sincerely,
</p><p>Mark Gentry
</p><p style="text-align: left;"><span style="background-color: rgb(255, 229, 153); font-size: 30px;"><strong><u style="font-family: &quot;Courier New&quot;, Courier, monospace; color: rgb(69, 129, 142);">Lead FOG Inspector</u></strong></span>
</p><p>City of Patterson Environmental Compliance Department
</p><p><a href="mailto:mgentry@ci.paterson.ca.us">mgentry@ci.paterson.ca.us</a></p><p>(209) 895-8060</p><p><br></p><iframe width="777px" height="375px" src="https://www.youtube.com/embed/xwZNGaMrwcE" frameborder="0" allowfullscreen="" style="display: block; margin-left: auto; margin-right: auto;"></iframe><p><br></p><p><br></p><p><span style="font-size: 24px;"><strong>Directed vs. undirected graphs</strong></span></p><p><img src="https://graphacademy.neo4j.com/courses/neo4j-fundamentals/1-graph-thinking/3-graph-structure/images/michael-sarah-undirected.jpg" alt="Neo4j" width="302" style="float: right;" height="302"></p><p><span style="font-size: 24px;"><span style="font-size: 16px;">In an undirected graph, relationships are considered to be bi-directional or symmetric.&nbsp;</span></span><span style="font-size: 24px;"><span style="font-size: 16px;">An example of an undirected graph would include the concept of marriage.</span></span></p><p><span style="font-size: 24px;"><span style="font-size: 16px;"> If&nbsp;Michael&nbsp;is married to&nbsp;Sarah, then it stands to reason that&nbsp;Sarah&nbsp;is also married to&nbsp;Michael.</span></span><br></p>
<p><br></p><p><img src="https://graphacademy.neo4j.com/courses/neo4j-fundamentals/1-graph-thinking/3-graph-structure/images/roads.jpg" alt="nanny" width="732" style="display: block; margin-left: auto; margin-right: auto; border: 1px solid rgb(204, 204, 204); width: 732px; height: 561px; border-radius: 12px;" height="561"><br></p>
`;

function App() {
  const [data, setData] = useState(initialContent);

  return (
    <div
      className="App"
      style={{ maxWidth: editorConfig.width, margin: "0 auto" }}
    >
      <JoditEditor
        value={data}
        config={editorConfig}
        onChange={(value) => setData(value)}
      />
    </div>
  );
}

const Articles = () => {
  return (
    <ProtectedRoute>
      <App />,
    </ProtectedRoute>
  );
};

export default Articles;
