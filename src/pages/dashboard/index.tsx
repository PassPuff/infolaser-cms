import { Row, Col, Card, Typography } from "antd";
import { useList } from "@refinedev/core";

const { Title } = Typography;

export const Dashboard: React.FC = () => {
  const { data: productsData } = useList({
    resource: "Products",
    pagination: { pageSize: 1, current: 1 },
  });

  const { data: categoriesData } = useList({
    resource: "Categories",
    pagination: { pageSize: 1, current: 1 },
  });

  const { data: usersData } = useList({
    resource: "users",
    pagination: { pageSize: 1, current: 1 },
  });

  const productsCount = productsData?.total ?? 0;
  const categoriesCount = categoriesData?.total ?? 0;
  const usersCount = usersData?.total ?? 0;

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Title level={2}>Панель управления</Title>
      </Col>
      <Col span={8}>
        <Card title="Товары" bordered={false}>
          <Title level={3}>{productsCount}</Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Категории" bordered={false}>
          <Title level={3}>{categoriesCount}</Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Пользователи" bordered={false}>
          <Title level={3}>{usersCount}</Title>
        </Card>
      </Col>
    </Row>
  );
};