javascript: (function () {
  var src = "";
  var bycRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]BYC seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var n_mRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]N-M seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var qmgRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]QMG seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var lenRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]LEN seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var sisRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]SIS seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var tmrRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]TMR seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var cctRe = new RegExp(
    /\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\]CCT seed: \S+\[\/color\]\[\/size\]/,
    "g"
  );
  var res = [bycRe, n_mRe, qmgRe, lenRe, sisRe, tmrRe, cctRe];
  var ts = document.getElementsByTagName("textarea");
  var t = ts[ts.length - 1];
  if (t === undefined) {
    alert(
      "These scripts only work while creating or editing a post on the BGG forums."
    );
    return;
  }
  let game = -1;
  for (let k = 0; !(k >= res.length); k++) {
    let gameRe = res[k].exec(t.value);
    if (gameRe !== null) {
      game = k;
    }
  }
  if (game === -1) {
    let bla = prompt(
      "What game would you like to play? (1-7)\n1: Battlestar Galactica\n2: Dark Moon\n3: Quartermaster General: 1914\n4: Leaving Earth\n5: Warehouse 13: The Board Game\n6: Unfathomable\n7: Blood on the Clocktower"
    );
    game = parseInt(bla);
    if (!Number.isInteger(game) || 1 > game || game > res.length) {
      return;
    }
    game--;
  }
  var names = ["BYC", "NMWS", "QMG", "LE", "SIS", "TMR", "CC"];
  var filenames = [["BYCv2"],["darkmoonv2"],["qmg1914v3"],["leavingearth"],["warehouse13beta"],["TMRlocalization","TMRv2"],"ccscript"];
  var suffixes = [
    ["A", "B", "C", "D", "E", "F"],
    [""],
    ["A", "B"],
    ["A", "B"],
    [""],
    ["L", "A", "B", "C"],
    ["A", "B"]
  ];
  var qres = [];
  var counts = [-1, -1, -1, -1, -1, 2, -1];
  for (let j = 0; !(j >= suffixes[game].length); j++) {
    qres.push(
      new RegExp(
        "START" +
          names[game] +
          suffixes[game][j] +
          "[\\s\\S]*?END" +
          names[game] +
          suffixes[game][j],
        "g"
      )
    );
  }
  /*let epoch = 1553295600000; let date = new Date(); let week = "" + Math.floor((date.getTime() - epoch) / 604800000);*/ function reqListener() {
    src = this.responseText;
    var done = true;
    var found = 0;
    var any = false;
    var gtre = new RegExp("&" + "gt;", "g");
    var ampre = new RegExp("&" + "amp;", "g");
    var quotre = new RegExp("&" + "quot;", "g");
    var are = new RegExp(String.fromCharCode(60) + "[^>]*>", "g");
    var totalJs = "";
    var jsPart = "";
    for (let j = 0; !(j >= qres.length); j++) {
      var js = qres[j].exec(src);
      if (js === null) {
        jsPart = window.localStorage.getItem(
          names[game].toLowerCase() + "Js" + suffixes[game][j]
        );
        if (jsPart === null) {
          done = false;
        } else {
          totalJs += jsPart;
          found += 1;
        }
        continue;
      }
      let startchar = 5 + names[game].length + suffixes[game][j].length;
      let endchar = -(3 + names[game].length + suffixes[game][j].length);
      jsPart = js[0].slice(startchar, endchar);
      jsPart = jsPart.replace(gtre, ">");
      jsPart = jsPart.replace(ampre, "&");
      jsPart = jsPart.replace(quotre, '"');
      jsPart = jsPart.replace(are, "");
      window.localStorage.setItem(
        names[game].toLowerCase() + "Js" + suffixes[game][j],
        jsPart
      );
      totalJs += jsPart;
      found += 1;
      any = true;
    }
    if (!any) {
      alert("Could not read script");
      return;
    }
    if (done) {
      /*window.localStorage.setItem(names[game].toLowerCase()+"Week", week);*/ window.localStorage.removeItem(
        names[game].toLowerCase() + "Urgent"
      );
      try {
        eval(totalJs);
      } catch (error) {
        window.localStorage.setItem(
          names[game].toLowerCase() + "Urgent",
          "error (updated)"
        );
        alert(
          names[game] +
            " encountered the following error:\n" +
            error.message +
            "\nPlease GM Grafin and let her know the error you encountered and what you were trying to do when " +
            names[game] +
            " encountered the error."
        );
        console.error(error);
      }
    } else if (found === counts[game]) {
      let oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "https://ztt628.github.io/by-your-command/" + filenames[game][1]+".js");
      oReq.send();
    } else {
      alert("Could not read script");
      return;
    }
  }
  /*let lastWeek = window.localStorage.getItem(names[game].toLowerCase()+"Week");*/ var bycJs =
    "";
  var done = true;
  for (let j = 0; !(j >= qres.length); j++) {
    var jsPart = window.localStorage.getItem(
      names[game].toLowerCase() + "Js" + suffixes[game][j]
    );
    if (jsPart === null) {
      done = false;
      break;
    } else {
      bycJs += jsPart;
    }
  }
  let urgent = window.localStorage.getItem(
    names[game].toLowerCase() + "Urgent"
  );
  if (!done || /*lastWeek !== week ||*/ urgent) {
    var oReq = new XMLHttpRequest();
    for (let j = 0; !(j >= qres.length); j++) {
      window.localStorage.removeItem(
        names[game].toLowerCase() + "Js" + suffixes[game][j]
      );
    }
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://ztt628.github.io/by-your-command/" + filenames[game][0]+".js");
    oReq.send();
  } else {
    try {
      eval(bycJs);
    } catch (error) {
      window.localStorage.setItem(
        names[game].toLowerCase() + "Urgent",
        "error (not updated)"
      );
      alert(
        names[game] +
          " encountered an error:\n" +
          error.message +
          "\nThis error may have already been fixed; please run " +
          names[game] +
          " again and see if it reoccurs."
      );
      console.error(error);
    }
  }
})();
