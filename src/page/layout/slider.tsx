import React from 'react';
import styles from './index.module.less';
import { ExpandOutlined } from '@ant-design/icons';
import { setting } from '../../settings/action';
import { InputNumber, Form, Input, Tooltip } from 'antd';
import logo from '../../assets/logo.png';
import Guide from '../../components/guide';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useUpdateEffect } from 'ahooks';
import { setLine, setRect } from '../../store/dashboard';

type PropKey = 'default' | 'geometric' | 'notGeometric';

const current = 'line';

const InputType = ['color', 'fill'];
const InputNumberType = [
  'cx',
  'cy',
  'r',
  'x1',
  'x2',
  'y1',
  'y2',
  'left',
  'top',
];

const Slider: React.FC = () => {
  const currentSetting = setting[current];
  const position = currentSetting['position'];
  const geometric = currentSetting['geometric'];
  const notGeometric = currentSetting['notGeometric'];
  const [positionForm] = Form.useForm();
  const [geometricForm] = Form.useForm();
  const [notGeometricForm] = Form.useForm();
  const { currentForm } = useSelector((state: RootState) => state.tool);
  const { line, rect } = useSelector((state: RootState) => state.dashboard);

  useUpdateEffect(() => {
    const { x1, y1 } = currentForm;
    notGeometricForm.setFieldsValue(currentForm);
    geometricForm.setFieldsValue(currentForm);
    positionForm.setFieldsValue({ top: y1, left: x1 });
    console.log(currentForm);
  }, [currentForm]);

  const dispatch = useDispatch();

  const formChange = () => {
    const geoForm = geometricForm.getFieldsValue();
    const notGeoForm = notGeometricForm.getFieldsValue();
    const copy = Object.assign([], line);
    copy.pop();
    dispatch(setLine([...copy, Object.assign({}, geoForm, notGeoForm)]));
  };
  return (
    <div className={styles.slider}>
      <div className={styles.logo}>
        <ExpandOutlined style={{ fontSize: '20px' }} />
        <span className={styles.title}>
          <img className={styles['logo-img']} src={logo} />
        </span>
      </div>
      <div className={styles['action-area']}>
        {currentSetting && (
          <>
            <div className={styles.card}>
              <Form
                size="small"
                labelCol={{ span: 8, offset: 0 }}
                colon={false}
                onChange={formChange}
                form={positionForm}
              >
                {Object.keys(position).map((key) => {
                  // Number((props as any)[key])
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={<div className={styles.label}>{key}</div>}
                    >
                      {InputNumberType.includes(key) ? (
                        <InputNumber max={1000} min={0}></InputNumber>
                      ) : (
                        <Input size="small"></Input>
                      )}
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
            <div className={styles.card}>
              <Form
                size="small"
                labelCol={{ span: 8, offset: 0 }}
                colon={false}
                onValuesChange={formChange}
                form={geometricForm}
              >
                {Object.keys(geometric).map((key) => {
                  // Number((props as any)[key])
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={<div className={styles.label}>{key}</div>}
                    >
                      {InputNumberType.includes(key) ? (
                        <InputNumber max={1000} min={0}></InputNumber>
                      ) : (
                        <Input size="small"></Input>
                      )}
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
            <div className={styles.card}>
              <Form
                size="small"
                labelCol={{ span: 8, offset: 0 }}
                colon={false}
                onChange={formChange}
                form={notGeometricForm}
              >
                {Object.keys(notGeometric).map((key) => {
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={
                        <Tooltip title={key}>
                          <div className={styles.label}>{key}</div>
                        </Tooltip>
                      }
                    >
                      {InputNumberType.includes(key) ? (
                        <InputNumber max={1000} min={0}></InputNumber>
                      ) : (
                        <Input size="small"></Input>
                      )}
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
          </>
        )}
        {/* 操作导航 */}
        {!currentSetting && <Guide />}
      </div>
    </div>
  );
};

export default Slider;
