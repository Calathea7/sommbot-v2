// function UserProfile(props) {

//   const [savedRecs, setSavedRecs] = React.useState(["loading..."])

//   fetch('/api/user-profile')
//   .then(res => res.json())
//   .then((data) => {
//     const recs = []
//     for (const rec of data) {
//       recs.push(<PostRecItem rec={rec}/>)
//     }
//     setSavedRecs(recs)
//   })

//   return (
//     <div>
//       <ul>
//         {savedRecs}
//       </ul>
//     </div>
//   )
// }
