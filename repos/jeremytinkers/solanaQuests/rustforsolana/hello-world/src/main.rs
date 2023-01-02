//MUTABILITY
fn main() {
    let mut x = 5;
    println!("The value of x is : {}", x);
    x = 4;
    println!("The value of x is : {}", x);
}

// INTRODUCTORY TYPE
// fn main(){
//     let x: i32=5;
//     if x==5{
//         println!("x is 5");
//     }
//     else {
//         println!("x is not 5");
//     }
// }

// TUPLE
// fn main(){
//   let info=(19,"Jeremiah",false);
//   println!("the first value is {}",info.0);
//   println!("the second value is {}",info.1);
//   println!("the third value is {}",info.2);
// }

// CONTROL FLOW
// fn main(){
//     // if else
//     let n=1;
//     if n==1{
//         println!("One");
//     }
//     else{
//         println!("NotOne");
//     }
// }

// LOOPS

// fn main(){
//     let mut x=1;
//     loop{
//         if x>200 {
//         break;}
//         x*=2;
//         println!("{}",x);
//     }

//      let mut y=100;
//      while y>0{
//          println!("{}",y);
//          y/=2;
//      } 
//     // 0 to 9
//     for x in 0..10{  
//         println!("{}",x);
//     }
//     // 0 to 10
//     for x in 0..=10{  
//         println!("{}",x);
//     }
//     let y=[1,1,3,5,8];
//     for val in y{
//         println!("{}",val);
//     }
// }

//------MATCH-------//
// fn main(){
//     let x=13; 
//     match x {
//         13 => println!("Unlucky! The value of x is {}",x),
//         _ => println!("Not a match"),
//     }

//     let p=true;
//     let q=false;
//      match (a, b){
//          (true,false) => println!("p true , q false"),
//          (false,false) => println!("Both false"),
//          (true,false) =>println!("p true"),
//          _ => println!("Invalid Entry")
//      }
// }
