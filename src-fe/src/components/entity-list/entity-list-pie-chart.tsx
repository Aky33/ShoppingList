import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { EntityOutputType } from "../../types/entity-output-type";
import { useTranslation } from "react-i18next";

type Props = {
  entities: EntityOutputType[];
};

export default function EntityListPieChart({ entities }: Props) {
  const { t } = useTranslation("entityListPieChart");

  const doneCount = entities.filter((e) => e.isDone).length;
  const notDoneCount = entities.length - doneCount;

  const data = [
    { name: t("completed"), value: doneCount },
    { name: t("notCompleted"), value: notDoneCount }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
