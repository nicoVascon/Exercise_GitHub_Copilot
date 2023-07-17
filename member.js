function skillsMember() {
    var member = document.getElementById("member");
    var memberText = member.options[member.selectedIndex].text;
    var memberValue = member.options[member.selectedIndex].value;
    var skills = document.getElementById("skills");
    var skillsText = skills.options[skills.selectedIndex].text;
    var skillsValue = skills.options[skills.selectedIndex].value;
    var skillsMember = document.getElementById("skillsMember");
    var skillsMemberText = skillsMember.options[skillsMember.selectedIndex].text;
    var skillsMemberValue = skillsMember.options[skillsMember.selectedIndex].value;
    if (memberText == "Yes" && skillsText == "Yes" && skillsMemberText == "Yes") {
        document.getElementById("skillsMember").style.backgroundColor = "#00FF00";
    }
    else {
        document.getElementById("skillsMember").style.backgroundColor = "#FF0000";
    }
}