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


    // <form>
    //   <div className="container">
    //       <div className="form-group">
    //         <div className="form-row justify-content-center">
    //           <div className="col-5">
    //             <label htmlFor="exampleInputEmail1">Email Address</label>
    //               <input
    //                 id="exampleInputEmail1"
    //                 className="form-control"
    //                 type="email"
    //                 placeholder="Enter email"
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 value={email}>
    //               </input>
    //               <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="form-group">
    //         <div className="form-row justify-content-center">
    //           <div className="col-5">
    //             <label htmlFor="exampleInputName1">Name</label>
    //               <input
    //                 id="exampleInputName1"
    //                 className="form-control"
    //                 type="text"
    //                 placeholder="Enter name"
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 value={name}>
    //               </input>
    //               <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="form-group">
    //         <div className="form-row justify-content-center">
    //           <div className="col-5">
    //             <label htmlFor="exampleInputPassword1">Password</label>
    //               <input
    //                 id="exampleInputPassword1"
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Password"
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 value={password}>
    //               </input>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="row justify-content-center">
    //         <button className="btn btn-primary" onClick={CreateUser}> Create Profile </button>
    //       </div>
    //   </div>
    // </form>


<div class="card-group">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
</div>
