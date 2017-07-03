$(function() {
    
    var problemSolvingModal = document.getElementById('problemSolvingModal');
    var programmingLanguageModal = document.getElementById('programmingLanguageModal');
    var teamWorkModal = document.getElementById('teamWorkModal');
    var organisingAndPriortisingModal = document.getElementById('organisingAndPriortisingModal');
    var startUpExperienceModal = document.getElementById('startUpExperienceModal');
    
    var koreaArmyModal = document.getElementById('koreaArmyModal');
    var japaneseRestaurantModal = document.getElementById('japaneseRestaurantModal');
    var pizzaStoreModal = document.getElementById('pizzaStoreModal');
    
    

    // When the user clicks the div, open the modal 
    $('#problemSolving').click(function() {
        $('#problemSolvingModal').css({display: "block"});
    });
    
    $('#programmingLanguage').click(function() {
        $('#programmingLanguageModal').css({display: "block"});
    });
    
    $('#teamWork').click(function() {
        $('#teamWorkModal').css({display: "block"});
    });
    
    $('#organisingAndPriortising').click(function() {
        $('#organisingAndPriortisingModal').css({display: "block"});
    });
    
    $('#startUpExperience').click(function() {
        $('#startUpExperienceModal').css({display: "block"});
    });
    
    $('#koreaArmy').click(function() {
        $('#koreaArmyModal').css({display: "block"});
    });
    
    $('#japaneseRestaurant').click(function() {
        $('#japaneseRestaurantModal').css({display: "block"});
    });
    
    $('#pizzaStore').click(function() {
        $('#pizzaStoreModal').css({display: "block"});
    });
    
//    $('.workExperience').click(function() {
//        problemSolvingModal.style.display = "block";
//    });

    // When the user clicks on <span> (x), close the modal
    $('.close').click(function() {
        $('.modal').css({display: "none"});
    });

    // When the user clicks anywhere outside of the modal, close it
    $(document).click(function(event) {
        if (event.target == problemSolvingModal) {
            $('#problemSolvingModal').css({display: "none"});
        } else if (event.target == programmingLanguageModal) {
            $('#programmingLanguageModal').css({display: "none"});
        } else if (event.target == teamWorkModal) {
            $('#teamWorkModal').css({display: "none"});
        } else if (event.target == organisingAndPriortisingModal) {
            $('#organisingAndPriortisingModal').css({display: "none"});
        } else if (event.target == startUpExperienceModal) {
            $('#startUpExperienceModal').css({display: "none"});
        } else if (event.target == koreaArmyModal) {
            $('#koreaArmyModal').css({display: "none"});
        } else if (event.target == japaneseRestaurantModal) {
            $('#japaneseRestaurantModal').css({display: "none"});
        } else if (event.target == pizzaStoreModal) {
            $('#pizzaStoreModal').css({display: "none"});
        } 
    });

    
});