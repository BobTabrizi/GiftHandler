/**
 *
 * @PageLocation FTUE
 * @Component TutorialParts
 * @Description JSX Components for the FTUE Page Modal
 *
 */

//Create Components for each page of the tutorial.
let PartOne = (
  <div>
    <h3>Create or Join a group on your home page.</h3>
    <img
      src={`/api/images/FTUE_S1_P1`}
      width={700}
      height={400}
      alt="TutorialImage"
    ></img>
  </div>
);

let PartTwo = (
  <div>
    <h3>Joining a Group.</h3>
    <h4>Join an existing group with a group name and passcode.</h4>
    <img
      src={`/api/images/FTUE_S1_P2`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartThree = (
  <div>
    <h3>Create a Group/Event (Part 1).</h3>
    <h4>First set the type of group/event.</h4>
    <img
      src={`/api/images/FTUE_S2_P1`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartFour = (
  <div>
    <h3>Create a Group/Event (Part 2).</h3>
    <h4>You can set a cover image or leave it as default.</h4>
    <img
      src={`/api/images/FTUE_S2_P2`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartFive = (
  <div>
    <h3>Create a Group/Event (Part 3).</h3>
    <h4>Enter in a description about your group or event.</h4>
    <img
      src={`/api/images/FTUE_S2_P3`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartSix = (
  <div>
    <h3>Create a Group/Event (Part 4).</h3>
    <h4>Set the name and passcode of the group.</h4>
    <img
      src={`/api/images/FTUE_S2_P4`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartSeven = (
  <div>
    <h3>Homepage Groups/Events (Part 1).</h3>
    <h4>As you Join/Create groups they will be listed on your homepage.</h4>
    <img
      src={`/api/images/FTUE_S3_P1`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartEight = (
  <div>
    <h3>Homepage Groups/Events (Part 2).</h3>
    <h4>
      The Top left icon on each group shows if you own the group or are a
      member. You can click these icons to leave a group or show group settings.
    </h4>
    <img
      src={`/api/images/FTUE_S3_P2`}
      width={700}
      height={355}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartNine = (
  <div>
    <h3>Adding Items</h3>
    <h4>
      On each Group/Event page, you can add and delete items by clicking the add
      card
    </h4>
    <img
      src={`/api/images/FTUE_S4_P1`}
      width={700}
      height={375}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartTen = (
  <div>
    <h3>Filter/View Items</h3>
    <h4>
      Once you have items, you can filter them using the group info button. You
      edit your items by clicking their images.
    </h4>
    <img
      src={`/api/images/FTUE_S4_P2`}
      width={700}
      height={350}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartEleven = (
  <div>
    <h3>Editing Items</h3>
    <h4>
      Once clicked, you can modify any aspects of your items you have listed.
    </h4>
    <img
      src={`/api/images/FTUE_S4_P3`}
      width={550}
      height={350}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartTwelve = (
  <div>
    <h3>Group Members</h3>
    <h4>
      The members in each group are listed on your group page. You can click
      their images to visit their item page.
      <br />
      If there are more than 3 members, you can click the number icon and view
      all members in the group and select one from the list.
    </h4>
    <img
      src={`/api/images/FTUE_S4_P4`}
      width={700}
      height={250}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartThirteen = (
  <div>
    <h3>Event Pages (Part 1).</h3>
    <h4>
      Event pages can be accessed through links given by the creator. On these
      pages you can purchase items from their list.
    </h4>
    <img
      src={`/api/images/FTUE_S5_P1`}
      width={550}
      height={350}
      alt="TutorialImage"
    ></img>
  </div>
);
let PartFourteen = (
  <div>
    <h3>Event Pages (Part 2).</h3>
    <h4>
      Once a listed item's quantity reaches zero, it is flagged as purchased and
      no longer is selectable.
    </h4>
    <img
      src={`/api/images/FTUE_S5_P2`}
      width={550}
      height={350}
      alt="TutorialImage"
    ></img>
  </div>
);

/*---------------------------Part Array-------------------------------*/
//Put each component into an array for navigation between components
export const PartArray = [
  PartOne,
  PartTwo,
  PartThree,
  PartFour,
  PartFive,
  PartSix,
  PartSeven,
  PartEight,
  PartNine,
  PartTen,
  PartEleven,
  PartTwelve,
  PartThirteen,
  PartFourteen,
];
