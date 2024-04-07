// import React from "react";
// import {
//   data,
//   information,
//   newest,
//   yesterday,
//   calendar,
//   wifi,
//   angle,
//   download,
//   deleteBtn,
// } from "../../utils/BillingData";
// import mastercard from "../assets/images/mastercard-logo.png";
// import discount from "../assets/images/discount.png";
// import {
//   Row,
//   Col,
//   Card,
//   Statistic,
//   Button,
//   List,
//   Descriptions,
//   Avatar,
// } from "antd";
// import { Iconify } from "../../utils/Iconify";
// import moment from "moment";

// interface DesItem {
//   label: string;
//   name: string;
// }

// const Billing: React.FC = () => {
//   const desItem: DesItem[] = [
//     {
//       label: "Company Name",
//       name: "Viking Burrito",
//     },
//     {
//       label: "Email Address",
//       name: "judarclitus@eneighbor.com",
//     },
//     {
//       label: "VAT Number",
//       name: "FRB1235476",
//     },
//   ];

//   return (
//     <>
//       <Row gutter={[24, 0]}>
//         <Col xs={24} md={16}>
//           <Row gutter={[24, 0]}>
//             <Col xs={24} lg={12} className="mb-24">
//               <Card
//                 title={wifi}
//                 bordered={false}
//                 className="card-credit header-solid h-ful"
//               >
//                 <h5 className="card-number">4562 1122 4594 7852</h5>
//                 <div className="card-footer">
//                   <div className="mr-30">
//                     <p>Card Holder</p>
//                     <h6>Judar Clitus</h6>
//                   </div>
//                   <div className="mr-30">
//                     <p>Expires</p>
//                     <h6>11/12</h6>
//                   </div>
//                   <div className="card-footer-col col-logo ml-auto">
//                     <img src={mastercard} alt="" />
//                   </div>
//                 </div>
//               </Card>
//             </Col>
//             <Col xs={12} xl={6} className="mb-24">
//               <Card bordered={false} className="widget-2 h-full">
//                 <Statistic
//                   title={
//                     <>
//                       <div className="icon">{angle}</div>
//                       <h6>System Balance</h6>
//                       <p>Your Balance</p>
//                     </>
//                   }
//                   value="19,200,000 VND"
//                 />
//               </Card>
//             </Col>
//             <Col xs={12} xl={6} className="mb-24">
//               <Card bordered={false} className="widget-2 h-full">
//                 <Statistic
//                   title={
//                     <>
//                       <div className="icon">
//                         <img src={discount} alt="" />
//                       </div>
//                       <h6>Discount</h6>
//                       <p>Valid before June 30</p>
//                     </>
//                   }
//                   value="49,000 VND"
//                 />
//               </Card>
//             </Col>
//             <Col xs={24} className="mb-24">
//               <Card
//                 className="header-solid h-full ant-card-p-0"
//                 title={
//                   <Row
//                     gutter={[24, 0]}
//                     className="ant-row-flex ant-row-flex-middle"
//                   >
//                     <Col xs={24} md={12}>
//                       <h6 className="font-semibold m-0">Payment Methods</h6>
//                     </Col>
//                     <Col className="d-flex" md={12} xs={24}>
//                       <Button type="primary">ADD NEW CARD</Button>
//                     </Col>
//                   </Row>
//                 }
//               >
//                 <Row gutter={[24, 0]}>
//                   <Col xs={24} md={12}>
//                     <Card className="payment-method-card">
//                       <img src={mastercard} alt="" />
//                       <h6 className="card-number">**** **** **** 763</h6>
//                       <Button className="ant-edit-link" type="link">
//                         {<Iconify icon="akar-icons:pencil" />}
//                       </Button>
//                     </Card>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </Col>
//         <Col span={24} md={8} className="mb-24">
//           <Card
//             bordered={false}
//             className="header-solid h-full ant-invoice-card"
//             title={<h6 className="font-semibold m-0">Invoice</h6>}
//             extra={<Button type="primary">VIEW ALL</Button>}
//           >
//             <List
//               dataSource={data}
//               renderItem={({ amount, description, title }) => (
//                 <List.Item
//                   actions={[<Button type="link">{download}PDF</Button>]}
//                 >
//                   <List.Item.Meta title={title} description={description} />
//                   <div className="amount">{amount}</div>
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>
//       </Row>
//       <Row gutter={[24, 0]}>
//         <Col span={24} md={16} className="mb-24">
//           <Card
//             className="header-solid h-full"
//             bordered={false}
//             title={<h6 className="font-semibold m-0">Billing Information</h6>}
//             bodyStyle={{ paddingTop: 0 }}
//           >
//             <Row gutter={[24, 24]}>
//               {information.map((i, index) => (
//                 <Col span={24} key={index}>
//                   <Card className="card-billing-info" bordered={false}>
//                     <div className="col-info">
//                       <Descriptions title="Oliver Liam">
//                         {desItem.map(({ name, label }, index) => (
//                           <Descriptions.Item label={label} span={3} key={index}>
//                             {name}
//                           </Descriptions.Item>
//                         ))}
//                       </Descriptions>
//                     </div>
//                     <div className="col-action">
//                       <Button type="link" danger>
//                         {deleteBtn}DELETE
//                       </Button>
//                       <Button type="link" className="darkbtn">
//                         {<Iconify icon="akar-icons:pencil" />} EDIT
//                       </Button>
//                     </div>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </Card>
//         </Col>
//         <Col span={24} md={8} className="mb-24">
//           <Card
//             bordered={false}
//             // bodyStyle={{ paddingTop: 0 }}
//             className="header-solid h-full  ant-list-yes"
//             title={<h6 className="font-semibold m-0">Your Transactions</h6>}
//             extra={
//               <p className="card-header-date">
//                 {calendar}
//                 <span>{moment().subtract(10, "month").calendar()}</span>
//               </p>
//             }
//           >
//             <List
//               header={<h6>NEWEST</h6>}
//               className="transactions-list ant-newest"
//               itemLayout="horizontal"
//               dataSource={newest}
//               renderItem={(item) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     title={item.title}
//                     description={item.description}
//                     avatar={
//                       <Avatar size="small" className={item.textclass}>
//                         {item.avatar}
//                       </Avatar>
//                     }
//                   />
//                   <div className="amount">
//                     <span className={item.amountcolor}>{item.amount}</span>
//                   </div>
//                 </List.Item>
//               )}
//             />
//             <List
//               header={<h6>YESTERDAY</h6>}
//               className="yestday transactions-list"
//               itemLayout="horizontal"
//               dataSource={yesterday}
//               renderItem={(item) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar size="small" className={item.textclass}>
//                         {item.avatar}
//                       </Avatar>
//                     }
//                     title={item.title}
//                     description={item.description}
//                   />
//                   <div className="amount">
//                     <span className={item.amountcolor}>{item.amount}</span>
//                   </div>
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default Billing;
