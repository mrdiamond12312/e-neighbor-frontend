import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Avatar } from 'antd';

const itemConversation: React.FC = (item: any) => {
  return (
    <Row gutter={2} className="flex flex-row my-7">
      <Col span={4}>
        <Avatar shape="square" size={38} icon={<UserOutlined />} />
      </Col>
      <Col span={16}>
        <p className="font-semibold">{item.name}</p>
        <p className="font-medium text-xs text-gray-400">{item.content}</p>
      </Col>
      <Col span={4} className="mt-4">
        <a href="" className="uppercase font-semibold text-xs text-teal-3">
          Reply
        </a>
      </Col>
    </Row>
  );
};

export default itemConversation;
